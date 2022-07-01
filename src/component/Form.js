import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  addBill,
  changeAmount,
  changeBillId,
  removeFirstBill,
  updateBill,
} from "../store/BillSlice";

const ModalForm = ({ setVisible, type, data }) => {
  console.log(data);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: data || {} });
  const dispatch = useDispatch();

  //   console.log(errors);

  const onSubmit = async (d, e) => {
    setVisible(false);
    if (type === "create") {
      dispatch(addBill({ _id: "creating", ...d }));
      const res = await fetch("https://obscure-ocean-04594.herokuapp.com/api/add-billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem('token')
        },
        body: JSON.stringify(d),
      });
      if (res.ok) {
        toast.success("Bill Added Successfully!");
        const d = await res.json();
        dispatch(changeBillId({id:d.id, amount: d.amount}));
      } else {
        // if(res.status === 403) localStorage.removeItem('token')
        toast.error("Something Wrong Happend");
        dispatch(removeFirstBill(d.amount));
      }
    } else {
      dispatch(changeAmount(parseInt(d.amount) - parseInt(data.amount)))
      const res = await fetch(
        `https://obscure-ocean-04594.herokuapp.com/api/update-billing/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token')
          },
          body: JSON.stringify(d),
        }
      );
      const jsonData = await res.json();
      if (res.ok) {
        toast.success("Bill Updated Successfully");
        dispatch(updateBill({ id: data._id, data: jsonData }));
      } else {
        // if(res.status === 403) localStorage.removeItem('token')
        dispatch(changeAmount((parseInt(d.amount) - parseInt(data.amount)) * -1))
        toast.error(JSON.stringify(jsonData));
      }
    }
  };
  return (
    <div className="">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <Input
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
            type="text"
            placeholder="Your Name"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.name.message}
              </span>
            )}{" "}
          </label>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <Input
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
            type="email"
            placeholder="Your Email"
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-600">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <Input
            {...register("phone", {
              required: {
                value: true,
                message: "Phone Number is Required",
              },
              minLength: {
                value: 11,
                message: "Must be 11 characters or longer",
              },
            })}
            type="number"
            placeholder="Phone"
          />
          <label className="label">
            {errors.phone?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.phone.message}
              </span>
            )}
            {errors.phone?.type === "minLength" && (
              <span className="label-text-alt text-red-600">
                {errors.phone.message}
              </span>
            )}
          </label>
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <Input
            {...register("amount", {
              required: {
                value: true,
                message: "paid Amount is Required",
              },
            })}
            type="text"
            placeholder="Your Amount "
          />
          <label className="label">
            {errors.amount?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.amount.message}
              </span>
            )}{" "}
          </label>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-6">
          <Button onClick={() => setVisible(false)} auto color="error" ghost>
            Exit
          </Button>
          <Button type="submit" value="submit" auto>
            {type === "create" ? "Add" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
