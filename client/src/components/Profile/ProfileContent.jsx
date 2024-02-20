import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Label from "../form/Label";
import Input from "../form/Input";
import Button from "../form/Button";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Layouts/Loader";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { handleGetUserOrder } from "../../redux/reducers/orders";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUserOrder(user._id));
  }, []);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user ? user.name : " ");
  const [email, setEmail] = useState(user ? user.email : " ");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [favorites, setFavorites] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState(false);
  const [isImgChanged, setIsImgChanged] = useState(false);
  const handleUpdateUserDetailSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("avatar", avatar || user.avatar); // Ensure avatar is appended correctly
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("userId", user._id);
    newForm.append("isImgChanged", isImgChanged);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    try {
      setUpdatingDetails(true);
      let response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/user/updateUserDeatils`,
        newForm,
        { withCredentials: true },
        config
      );

      let newUser = response.data.updatedUser;
      setEmail(newUser.email);
      setPhoneNumber(newUser.phoneNumber);
      setName(newUser.name);
      toast.success("Details updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUpdatingDetails(false);
    }
  };

  let handleAvatarChange = (e) => {
    setIsImgChanged(true);
    const img = e.target.files[0];
    setAvatar(img);
  };
  return (
    <div className="w-full">
      {updatingDetails ? (
        <Loader />
      ) : (
        <>
          {active == 1 && (
            <>
              <div className="flex justify-center w-full">
                <div className="relative">
                  {user && (
                    <img
                      className="w-[150px] h-[150px] rounded-full object-cover  border-[3px] border-[#dfa0a0]"
                      src={` ${
                        (avatar && URL.createObjectURL(avatar)) || user.avatar
                      }`}
                      alt={`${user.avatar}`}
                    />
                  )}
                  <div className="w-[30px] h-[30px] bg-[#ead7d7] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                    <Label htmlFor={"avatar"} label={<AiOutlineCamera />} />
                    <input
                      type={"file"}
                      id={"avatar"}
                      className={"hidden"}
                      onChange={(e) => {
                        handleAvatarChange(e);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
              </div>
              <div className="w-full px-5">
                <form
                  onSubmit={handleUpdateUserDetailSubmit}
                  aria-required={true}>
                  <div className="w-full 800px:flex py-3 items-center mt-3">
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
                        className={"block pb-2"}
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
                  <div className="w-full 800px:flex py-3 items-center">
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
                        label={"Favourites"}
                        className={"block pb-2"}
                      />
                      {user && (
                        <Input
                          className={`${styles.input} !w-[95%] `}
                          type={"text"}
                          id={"zip"}
                          value={favorites || ""}
                          required={true}
                          handleChange={(newName) => setFavorites(newName)}
                        />
                      )}
                    </div>
                  </div>
                  <Button
                    type={"Submit"}
                    text={"Update Details"}
                    className={
                      "w-[250px] border border-[#3a24db] text-center text-[#ffffff] rounded-[3px] mt-8 cursor-pointer"
                    }
                  />
                </form>
              </div>
            </>
          )}
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
          <ChangePassword />
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
  const { userOrders } = useSelector((state) => state.orders);
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
      headerName: "Check Details By Clicking below",
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

  userOrders &&
    userOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.products.length,
        total: "₹ " + item.finalPaymentPrice,
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
const ChangePassword = () => {
  const { user } = useSelector((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCuPas, setShowCuPas] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  let handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("The new password is not matching, please check");
    }
    if (newPassword === currentPassword) {
      return toast.error(
        "The new password and current password cannot be same."
      );
    }
    try {
      let response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/user/changePassword`,
        {
          newPassword,
          confirmPassword,
          currentPassword,
          userId: user._id,
        },
        {
          withCredentials: true,
        }
      );
      setConfirmPassword("");
      setCurrentPassword("");
      setNewPassword("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full px-5">
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <h1 className="text-[25px] font-[600] text-[#000000] pb-2">
          Change Password
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded flex items-center px-3 shadow justify-between pr-10 py-2">
        <form onSubmit={handleChangePassword} className="w-full">
          <Label
            htmlFor={"currentPassword"}
            label={
              <div>
                Current Password{" "}
                <span className="text-red-500 text-xl"> *</span>
              </div>
            }
          />
          <div className="flex w-full bg-white border border-gray-400 rounded-lg items-center justify-between px-3 mt-2">
            <input
              type={showCuPas ? "text" : "password"}
              id={"currentPassword"}
              name={"currentPassword"}
              autoComplete={"password"}
              className={"w-full px-2 py-2"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {showCuPas ? (
              <FaRegEye
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setShowCuPas(false);
                }}
              />
            ) : (
              <FaRegEyeSlash
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setShowCuPas(true);
                }}
              />
            )}
          </div>
          <br />

          <Label
            htmlFor={"newPassword"}
            label={
              <div>
                New Password <span className="text-red-500 text-xl"> *</span>
              </div>
            }
          />
          <div className="flex w-full bg-white border border-gray-400 rounded-lg items-center justify-between px-3 mt-2">
            <input
              type={"password"}
              id={"newPassword"}
              name={"newPassword"}
              autoComplete={"password"}
              value={newPassword}
              className={"w-full px-2 py-2"}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <br />
          <Label
            htmlFor={"confirmPassword"}
            label={
              <div>
                Confirm Password{" "}
                <span className="text-red-500 text-xl"> *</span>
              </div>
            }
          />
          <div className="flex w-full bg-white border border-gray-400 rounded-lg items-center justify-between px-3 mt-2">
            <input
              type={showConPass ? "text" : "password"}
              id={"confirmPassword"}
              name={"confirmPassword"}
              autoComplete={"password"}
              value={confirmPassword}
              className={"w-full px-2 py-2"}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConPass ? (
              <FaRegEye
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setShowConPass(false);
                }}
              />
            ) : (
              <FaRegEyeSlash
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setShowConPass(true);
                }}
              />
            )}
          </div>
          <Button
            className={"mt-6 !bg-black !text-white"}
            text={"Change password"}
            type={"submit"}
          />
        </form>
      </div>
    </div>
  );
};
const Address = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("");
  // Inside the handleCountryChange function
  let handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    const selectedCountryObject = Country.getAllCountries().find(
      (item) => item.name === selectedCountry
    );
    if (selectedCountryObject) {
      const countryCode = selectedCountryObject.isoCode;
      setCountryCode(countryCode);
    }
  };
  let hnadleStateOfCouChange = (e) => {
    let selectedState = e.target.value;
    setState(e.target.value);
    let selected = State.getAllStates().find(
      (item) => item.name === selectedState
    );
    setStateCode(selected.isoCode);
  };
  let handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/user/addAddress`,
        {
          country,
          city,
          state,
          houseAddress,
          zipCode,
          addressType,
          userId: user._id,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setAddressType("");
      setCity("");
      setCountry("");
      setZipCode("");
      setState("");
      window.location.reload(true);
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };
  let handleDeleteAddress = async (addressType) => {
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/user/deleteAddress`,
        {
          data: { userId: user._id, addressType: addressType }, // Pass userId in the request body
          withCredentials: true,
        }
      );
      window.location.reload(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full px-5">
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <h1 className="text-[25px] font-[600] text-[#000000] pb-2">Address</h1>
        <div
          className={`${styles.button} !rounded-md `}
          onClick={() => {
            setOpen(true);
          }}>
          <span className="text-[#fff]">Add New / update</span>
        </div>
      </div>
      <br />
      {user &&
        user.address &&
        user.address.map((item) => (
          <div
            className="w-full bg-white h-full rounded-lg flex flex-col 800px:flex-row  items-center px-3 py-4 mb-3 hover:shadow-lg justify-between pr-10 space-y-5 "
            key={item._id}>
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{`${item.houseAddress} ${item.city} ${item.state} ${item.country}`}</h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{item.zipCode}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  handleDeleteAddress(item.addressType);
                }}
              />
            </div>
          </div>
        ))}
      {open && (
        <div className="bg-[#00000031] flex w-full fixed top-0 right-0 h-screen z-2000 justify-center items-center">
          <div className="bg-white w-[70%] 800px:w-[55%] h-[75%] 800px:h-[70%] rounded-lg z-2001 overflow-y-scroll ">
            <div className="flex justify-end items-center w-full pr-6 pt-4 ">
              <RxCross1
                size={35}
                onClick={() => {
                  setOpen(false);
                }}
                className="cursor-pointer"
              />
            </div>
            <div className={`${styles.heading} !text-center`}>
              Add a new address
            </div>
            <form onSubmit={handleAddressSubmit}>
              <div className="p-4">
                <Label htmlFor={"country"} label={"Select the Country *"} />
                <select
                  name="country"
                  required
                  id="country"
                  className="w-full bg-[#0000000d]  mt-2 py-2"
                  onChange={(e) => handleCountryChange(e)}>
                  <option value="" className="text-2xl">
                    Select the country
                  </option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option
                        value={item.name}
                        key={item.isoCode}
                        className="pb-2 block">
                        {item.name}
                      </option>
                    ))}
                </select>
                {/**State */}
                <br />
                <br />
                <Label htmlFor={"state"} label={"Select the state *"} />
                <select
                  name="state"
                  required
                  id="state"
                  className="w-full bg-[#0000000d]  mt-2 py-2"
                  onChange={(e) => {
                    hnadleStateOfCouChange(e);
                  }}
                  disabled={!country}>
                  <option value="" className="text-2xl">
                    Select the state
                  </option>
                  {State &&
                    State.getStatesOfCountry(countryCode).map((item) => (
                      <option
                        value={item.name}
                        key={item.isoCode}
                        className="pb-2 block">
                        {item.name}
                      </option>
                    ))}
                </select>
                {/**city */}
                <br />
                <br />
                <Label htmlFor={"city"} label={"Select the city *"} />
                <select
                  name="city"
                  required
                  id="city"
                  className="w-full bg-[#0000000d]  mt-2 py-2"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  disabled={!state}>
                  <option value="" className="text-2xl">
                    Select the city
                  </option>
                  {City &&
                    City.getCitiesOfState(countryCode, stateCode).map(
                      (item) => (
                        <option
                          value={item.name}
                          key={item.name}
                          className="pb-2 block">
                          {item.name}
                        </option>
                      )
                    )}
                </select>
                {/**House Address */}
                <br />
                <br />
                <Label htmlFor={"houseAddress"} label={"House Address *"} />
                <Input
                  id={"houseAddress"}
                  name={"houseAddress"}
                  autoComplete={"addres"}
                  type={"text"}
                  required={true}
                  className={"mt-2"}
                  handleChange={(newValue) => setHouseAddress(newValue)}
                />
                {/*Zip Code */}
                <br />
                <Label htmlFor={"zipCode"} label={"Zip Code *"} />
                <Input
                  id={"houseAddress"}
                  name={"houseAddress"}
                  autoComplete={"addres"}
                  type={"number"}
                  required={true}
                  className={"mt-2"}
                  handleChange={(newValue) => setZipCode(newValue)}
                />
                <br />
                <Label htmlFor={"addressType"} label={"Address Type *"} />
                <select
                  name="addressType"
                  id="addressType"
                  className="w-full bg-[#0000000d]  mt-2 py-2"
                  onChange={(e) => setAddressType(e.target.value)}>
                  <option>Select the address type</option>
                  <option>Default</option>
                  <option>Office</option>
                  <option>safe address</option>
                </select>
                <br />
                <Button
                  type={"Submit"}
                  text={"Add the address"}
                  className={"mt-4 !bg-black !text-white"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileContent;
