import { Button, Input, Pagination } from "@nextui-org/react";
import BillModal from "../component/BillModal";
import BillTable from "../component/BillTable";
import {useSelector, useDispatch} from 'react-redux'
import { searchBill, setCurrentPage } from "../store/BillSlice";
import { useState } from "react";

function Home() {
  const total = useSelector(state => state.bill.total)
  const currentPage = useSelector(state => state.bill.currentPage)
  const allBill = useSelector(state => state.bill.allBill)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const handlePagination = e => {
    dispatch(setCurrentPage(e))
  }

  const handleSearch = e => {
    setSearch(e.target.value)
    dispatch(searchBill(e.target.value))
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-end">
        <p className="border-b-4 border-black text-gray-700 pb-1">Paid Total : <span className="font-bold">{total}</span></p>
      </div>
      <header className="my-4 flex items-center">
        <div className="flex-grow">
          <Input underlined labelLeft="Billing" className="w-full" placeholder="Search" value={search} onChange={handleSearch} />
        </div>
        <BillModal type="create" />
      </header>
      <BillTable />
      <div className="mt-8 flex items-center justify-center">
      <Pagination color={'secondary'} shadow total={(allBill.length + 9) / 10} initialPage={currentPage} onChange={handlePagination} />
      </div>
    </div>
  );
}

export default Home;
