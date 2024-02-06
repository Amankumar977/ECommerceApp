import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Label from "../form/Label";
import Input from "../form/Input";
import Button from "../form/Button";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user ? user.name : " ");
  const [email, setEmail] = useState(user ? user.email : " ");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {active == 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              {user && (
                <img
                  className="w-[150px] h-[150px] rounded-full object-cover  border-[3px] border-[#dfa0a0]"
                  src={`${import.meta.env.VITE_BACKEND_LINK}/${user.avatar}`}
                  alt={`${import.meta.env.VITE_BACKEND_LINK}/${user.avatar}`}
                />
              )}
              <div className="w-[30px] h-[30px] bg-[#ead7d7] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex py-3">
                <div className="w-full  800px:w-[50%]">
                  <Label
                    htmlFor={"fullname"}
                    label={"Full Name"}
                    className={"block pb-2"}
                  />
                  {user && (
                    <Input
                      className={`${styles.input} !w-[95%] `}
                      id={"fullname"}
                      value={name || ""}
                      required={true}
                      handleChange={(newName) => setName(newName)}
                    />
                  )}
                </div>
                <div className=" w-full 800px:w-[50%]">
                  <Label
                    htmlFor={"email"}
                    label={"Email"}
                    className={"block pb-2 mt-3"}
                  />
                  {user && (
                    <Input
                      className={`${styles.input} !w-[95%] `}
                      type={"email"}
                      id={"email"}
                      value={email || ""}
                      required={true}
                      handleChange={(newName) => setEmail(newName)}
                    />
                  )}
                </div>
              </div>
              <div className="w-full 800px:flex py-3">
                <div className="w-full  800px:w-[50%]">
                  <Label
                    htmlFor={"phoneNumber"}
                    label={"Mobile Number"}
                    className={"block pb-2 "}
                  />
                  {user && (
                    <Input
                      required={true}
                      type={"number"}
                      className={`${styles.input} !w-[95%] `}
                      id={"phoneNumber"}
                      value={phoneNumber || ""}
                      handleChange={(newName) => setPhoneNumber(newName)}
                    />
                  )}
                </div>
                <div className="w-full 800px:w-[50%]">
                  <Label
                    required={true}
                    htmlFor={"zip"}
                    label={"Zip Code"}
                    className={"block pb-2 mt-3"}
                  />
                  {user && (
                    <Input
                      className={`${styles.input} !w-[95%] `}
                      type={"text"}
                      id={"zip"}
                      value={zipCode || ""}
                      required={true}
                      handleChange={(newName) => setZipCode(newName)}
                    />
                  )}
                </div>
              </div>
              <div className="w-full 800px:flex py-3">
                <div className="w-full  800px:w-[50%]">
                  <Label
                    htmlFor={"address"}
                    label={"Address 1"}
                    className={"block pb-2"}
                  />
                  {user && (
                    <Input
                      required={true}
                      type={"address"}
                      className={`${styles.input} !w-[95%] `}
                      id={"address"}
                      value={address1 || ""}
                      handleChange={(newName) => setAddress1(newName)}
                    />
                  )}
                </div>
                <div className="w-full  800px:w-[50%]">
                  <Label
                    htmlFor={"address2"}
                    label={"Address 2"}
                    className={"block pb-2 mt-3"}
                  />
                  {user && (
                    <Input
                      className={`${styles.input} !w-[95%] `}
                      type={"address"}
                      id={"address2"}
                      value={address2 || ""}
                      required={true}
                      handleChange={(newName) => setAddress2(newName)}
                    />
                  )}
                </div>
              </div>
              <Button
                type={"Submit"}
                text={"Submit"}
                className={
                  "w-[250px] border border-[#3a24db] text-center text-[#ffffff] rounded-[3px] mt-8 cursor-pointer"
                }
              />
            </form>
          </div>
        </>
      )}
      {/**Orders */}
      {active == 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active == 3 && (
        <div>
          <AllRefundOrder />
        </div>
      )}
      {active == 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active == 6 && (
        <div>
          <PaymentMethods />
        </div>
      )}
      {/**User address */}
      {active == 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};
const AllOrders = () => {
  const orders = [
    {
      _id: "avgshjkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjkl8fgh5gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 180,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjdfghkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 160,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return "status" === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Check Details",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <button
                className={
                  "bg-[#ffffff] text-gray-400 w-[50px] px-2 py-2 rounded-lg"
                }>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "₹ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const AllRefundOrder = () => {
  const orders = [
    {
      _id: "avgshjkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjkl8fgh5gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 180,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjdfghkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 160,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return "status" === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Check Details",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <button
                className={
                  "bg-[#ffffff] text-gray-400 w-[50px] px-2 py-2 rounded-lg"
                }>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "₹ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const TrackOrder = () => {
  let orders = [
    {
      _id: "avgshjkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjkl8fgh5gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 180,
      orderStatus: "Processing",
    },
    {
      _id: "avgshjdfghkl85gsu",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 160,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return "status" === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <button
                className={
                  "bg-[#ffffff] text-gray-400 w-[50px] px-2 py-2 rounded-lg"
                }>
                <MdOutlineTrackChanges size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.map((items) => {
      row.push({
        id: items._id,
        itemsOty: items.orderItems.length,
        total: items.totalPrice,
        status: items.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        columns={columns}
        rows={row}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const PaymentMethods = () => {
  return (
    <div className="w-full px-5">
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <h1 className="text-[25px] font-[600] text-[#000000] pb-2">
          Payment methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-16 rounded flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};
const Address = () => {
  return (
    <div className="w-full px-5">
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <h1 className="text-[25px] font-[600] text-[#000000] pb-2">Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-full rounded flex flex-col 800px:flex-row  items-center px-3 shadow justify-between pr-10 space-y-5">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>D-855 New Delhi 110075 New Delhi 110075</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>9855555263</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
