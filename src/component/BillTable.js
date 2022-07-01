import React, { useEffect, useState } from "react";
import { Loading, Table, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import BillModal from "./BillModal";
import { useDispatch, useSelector } from "react-redux";
import { changeAmount, removeBill, setAllBill } from "../store/BillSlice";
import toast from "react-hot-toast";

export default function BillTable() {
  const allBill = useSelector((state) => state.bill.allBill);
  const searchResult = useSelector((state) => state.bill.searchResult);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.bill.currentPage);
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState([]) 

  useEffect(() => {
    if(searchResult.length) setBills(searchResult)
    else setBills(allBill)
  }, [searchResult, allBill])

  useEffect(() => {
    setLoading(true);
    (async function init() {
      const res = await fetch("https://obscure-ocean-04594.herokuapp.com/api/billing-list", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    const data = await res.json()
    if(res.ok) {
      dispatch(setAllBill(data));
      setLoading(false);
    } else {
      // if(res.status === 403) {localStorage.removeItem('token'); }
      toast.error(JSON.stringify(data));
      setLoading(false);
      
    }
      
    })();
  }, [dispatch]);

  const handleDelete = async (id, amount) => {
    dispatch(changeAmount(parseInt(amount) * -1));
    const res = await fetch(`https://obscure-ocean-04594.herokuapp.com/api/delete-billing/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Bill Deleted Successfully");
      dispatch(removeBill(id));
    } else {
      // if(res.status === 403) {localStorage.removeItem('token'); }
      toast.error(JSON.stringify(data));
      dispatch(changeAmount(parseInt(amount)));
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          Fetching Data. <Loading />
        </div>
      ) : (
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>Billing ID</Table.Column>
            <Table.Column>Full Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Phone</Table.Column>
            <Table.Column>Paid Amount</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>
          <Table.Body>
            {bills.map((item, index) => {
              if (index >= (currentPage - 1) * 10 && index < currentPage * 10) {
                return (
                  <Table.Row key={item._id}>
                    <Table.Cell>
                      {item._id === "creating" ? (
                        <Loading type="spinner" size="lg" />
                      ) : (
                        item._id
                      )}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.amount}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center space-x-1">
                        <Tooltip content="Edit bill">
                          <BillModal type={"edit"} data={item} />
                        </Tooltip>
                        <Tooltip content="Delete bill" color="error">
                          <DeleteIcon
                            size={25}
                            fill="#FF0080"
                            onClick={() => handleDelete(item._id, item.amount)}
                          />
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              }
              return null;
            })}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
