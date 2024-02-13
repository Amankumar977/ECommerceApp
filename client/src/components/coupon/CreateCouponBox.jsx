import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "../../styles/styles";
import { Button, Input, Label } from "../form";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/reducers/products";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateCouponBox = ({ setOpenCreateBox }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller.shop._id));
  }, [dispatch]);
  const [name, setName] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const handleStartDateChange = (newValue) => {
    let startDate = new Date(newValue);
    let minEndDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("endDate").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (seller) {
      try {
        let response = await axios.post(
          `${import.meta.env.VITE_SERVER}/coupon/create-coupon`,
          {
            name,
            percentDiscount,
            minAmount,
            endDate,
            startDate,
            selectedProduct,
            shop: seller.shop,
          },
          {
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
        setName("");
        setEndDate(null);
        setMinAmount("");
        setStartDate(null);
        setPercentDiscount("");
        setSelectedProduct("");

        window.location.reload(true);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#00000049] fixed top-0 left-0 z-[2000] ">
      <div className="bg-white h-[80vh] overflow-y-scroll 800px:w-[40%] w-[70%] fixed mt-10 rounded-lg">
        <div className="mt-2 pr-4 flex justify-end w-full">
          <IoClose
            size={30}
            onClick={() => {
              setOpenCreateBox(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <div className={`${styles.heading} !text-center !font-Poppins`}>
          Create Coupon
        </div>
        <div className="px-8">
          <form onSubmit={handleCreateCoupon}>
            {/**Name of the coupon */}
            <div>
              <Label
                htmlFor={"name"}
                label={
                  <div>
                    Name of the coupon{" "}
                    <span className="text-red-700 text-[20px] pl-2">*</span>
                  </div>
                }
              />
              <Input
                type={"text"}
                id={"name"}
                required={true}
                name={"name"}
                value={name}
                className={"mt-2"}
                handleChange={(newValue) => setName(newValue)}
              />
            </div>
            {/** discount*/}
            <br />
            <div>
              <Label
                htmlFor={"discount"}
                label={
                  <div>
                    Discount percentage
                    <span className="text-red-700 text-[20px] pl-2">*</span>
                  </div>
                }
              />
              <Input
                type={"number"}
                id={"discount"}
                required={true}
                name={"discount"}
                value={percentDiscount || ""}
                className={"mt-2"}
                handleChange={(newValue) => setPercentDiscount(newValue)}
              />
            </div>
            {/** min Amount*/}
            <br />
            <div>
              <Label
                htmlFor={"minAmount"}
                label={<div>Minimum amount for coupon</div>}
              />
              <Input
                type={"number"}
                id={"minAmount"}
                name={"minAmount"}
                value={minAmount || ""}
                className={"mt-2"}
                handleChange={(newValue) => setMinAmount(newValue)}
              />
            </div>
            {/** set Start date*/}
            <br />
            <div>
              <Label
                htmlFor={"startDate"}
                label={<div>Start Date for coupon</div>}
              />
              <Input
                type={"date"}
                id={"startDate"}
                name={"startDate"}
                className={"mt-2"}
                min={new Date().toISOString().slice(0, 10)}
                handleChange={(newValue) => handleStartDateChange(newValue)}
              />
            </div>
            {/** set end date*/}
            <br />
            <div>
              <Label
                htmlFor={"endDate"}
                label={<div>End Date of coupon</div>}
              />
              <Input
                type={"date"}
                id={"endDate"}
                name={"endDate"}
                className={"mt-1"}
                disabled={!startDate}
                handleChange={(newValue) => setEndDate(newValue)}
              />
            </div>
            <br />
            <div>
              <Label
                htmlFor={"selectedProduct"}
                label={<div>Select the product</div>}
              />
              <select
                name="selectedProduct"
                id="selectedProduct"
                className="w-full bg-[#5555] px-4 py-2 text-xl mt-3 rounded-lg"
                onChange={(e) => setSelectedProduct(e.target.value)}>
                <option value="Select the product">Select the product</option>
                {products &&
                  products.map((data) => (
                    <option value={data.name} key={data._id}>
                      {data.name}
                    </option>
                  ))}
              </select>
            </div>
            {/**Submit button */}
            <div className="my-8">
              <Button text={"Create Coupon"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponBox;
