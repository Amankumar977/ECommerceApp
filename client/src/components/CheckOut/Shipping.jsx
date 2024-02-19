import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../form";
import Payment from "../CheckOut/Payment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckOutSteps from "./CheckOutSteps";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Layouts/Loader";
const Shipping = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [stateCode, SetStateCode] = useState("");
  const [city, setCity] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [discount, setDiscount] = useState("");
  const [shippingCharges, setShippingCharges] = useState(
    totalPrice > 500 ? 0 : 40
  );
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const finalPaymentPrice = totalPrice - discount + shippingCharges;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  }, []);
  let handleCountryChange = (e) => {
    let selectedCountry = e.target.value;
    setCountry(selectedCountry);
    let nameOfCountry = Country.getAllCountries().find(
      (country) => country.name === selectedCountry
    );
    setCountryCode(nameOfCountry.isoCode);
  };
  let handleStateChange = (e) => {
    let selectedState = e.target.value;
    setState(selectedState);
    let nameOfState = State.getStatesOfCountry(countryCode).find(
      (state) => state.name === selectedState
    );
    SetStateCode(nameOfState.isoCode);
  };
  let handleChooseAddress = (e) => {
    setLoading(true);
    let selectedAddressType = e.target.value;
    if (selectedAddressType === "select") {
      return toast.error("Please select valid a address type.");
    }
    const addressOfUser = user.address.find(
      (address) => address.addressType === selectedAddressType
    );
    setCountry(addressOfUser.country);
    let nameOfCountry = Country.getAllCountries().find(
      (country) => country.name === addressOfUser.country
    );
    setCountryCode(nameOfCountry.isoCode);
    setState(addressOfUser.state);
    let nameOfState = State.getStatesOfCountry(nameOfCountry.isoCode).find(
      (state) => state.name === addressOfUser.state
    );
    SetStateCode(nameOfState?.isoCode);
    setCity(addressOfUser.city);
    setHouseAddress(addressOfUser.houseAddress);
    setZipCode(addressOfUser.zipCode);
    setLoading(false);
  };
  let handleCheckCoupon = async () => {
    if (!couponCode) {
      return toast.error("Please provide a coupon code.");
    }
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_SERVER}/coupon/getCoupon/${couponCode}`,
        { withCredentials: true }
      );
      let shopCouponId = response.data.coupon.shop._id;
      let productName = response.data.coupon.selectedProduct;
      let minimumAmout = response.data.coupon.minAmount;
      if (totalPrice < minimumAmout) {
        return toast.error(
          `The order total is less for coupon, please increase it to ${minimumAmout}`
        );
      }
      let productCount = 0;
      let poductPrice = 0;
      let isProductFound = false;
      for (let item of cart) {
        if (item.shopId === shopCouponId && item.name === productName) {
          isProductFound = true;
          productCount += item.quantity;
          poductPrice = item.discountedPrice;
        }
      }
      if (!isProductFound) {
        return toast.error(
          "No products in the cart is eligible for this coupon"
        );
      }
      let discountPercentage = response.data.coupon.percentDiscount;
      let discountToBegiven =
        (poductPrice * productCount * discountPercentage) / 100;
      setDiscount(discountToBegiven);
      toast.success("coupon applied");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let handleGotoPayment = () => {
    if (
      !country ||
      !state ||
      !city ||
      !houseAddress ||
      !zipCode ||
      !name ||
      !email ||
      !phoneNumber
    ) {
      return toast.error("Please enter all the required details");
    }
    let shippinInfo = {
      country,
      state,
      city,
      houseAddress,
      zipCode,
    };
    let orderDetails = {
      shippinInfo,
      name,
      email,
      phoneNumber,
      finalPaymentPrice,
      discount,
      shippingCharges,
      userId: user._id,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderDetails));
    navigate("/payment");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center w-full mt-24 800px:mt-20 flex-col  ">
      <CheckOutSteps active={1} />
      <div className="md:flex justify-evenly md:gap-6  my-3 md:w-[90%]">
        <div className="bg-white px-6 py-3 md:px-10 md:py-4  my-3 mx-2 md:w-[50%] lg:w-[60%] rounded-lg">
          <h3>Shipping Address</h3>
          <form>
            <div className="mt-5 sm:flex justify-between items-center gap-4">
              {/**Full Name */}
              <div className="sm:w-1/2">
                <Label htmlFor={"name"} label={"Full name *"} />
                <Input
                  id={"name"}
                  name={"name"}
                  autoComplete={"name"}
                  placeholder={"name"}
                  required={true}
                  value={name}
                  handleChange={(newValue) => setName(newValue)}
                />
              </div>
              {/**Email Address */}
              <br />
              <div className="sm:w-1/2">
                <Label htmlFor={"email"} label={"Email *"} />
                <Input
                  id={"email"}
                  name={"email"}
                  autoComplete={"email"}
                  placeholder={"email"}
                  required={true}
                  value={email}
                  handleChange={(newValue) => setEmail(newValue)}
                />
              </div>
            </div>
            <div className="mt-5 sm:flex justify-between items-center gap-4">
              <div className="sm:w-1/2">
                {/**phoneNumber */}
                <Label htmlFor={"phoneNumber"} label={"Phone Number *"} />
                <Input
                  id={"phoneNumber"}
                  name={"phoneNumber"}
                  autoComplete={"phoneNumber"}
                  placeholder={"Phone Number"}
                  required={true}
                  value={phoneNumber}
                  handleChange={(newValue) => setPhoneNumber(newValue)}
                />
              </div>
              {/**Email Address */}
              <br />
              <div className="sm:w-1/2">
                <Label htmlFor={"zipCode"} label={"Zip Code *"} />
                <Input
                  id={"zipCode"}
                  name={"zipCode"}
                  autoComplete={"zipCode"}
                  placeholder={"zipCode"}
                  required={true}
                  value={zipCode}
                  handleChange={(newValue) => setZipCode(newValue)}
                />
              </div>
            </div>
            <div className="mt-5 sm:flex justify-between items-center gap-4">
              {/**country */}
              <div className="sm:w-1/2">
                <Label htmlFor={"country"} label={"Country *"} />
                <select
                  name="country"
                  id="country"
                  className="w-full bg-gray-100 px-1 py-2"
                  value={country}
                  onChange={handleCountryChange}>
                  <option value="seleectCountry">Select Country</option>
                  {Country &&
                    Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
              {/**State */}
              <br />
              <br />
              <div className="sm:w-1/2">
                <Label htmlFor={"state"} label={"State *"} />
                <select
                  name="state"
                  id="state"
                  className="w-full bg-gray-100 px-1 py-2"
                  value={state}
                  onChange={handleStateChange}>
                  <option value="selectState">Select state</option>
                  {State &&
                    State.getStatesOfCountry(countryCode).map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-5 sm:flex justify-between items-center gap-4">
              {/**city */}
              <div className="sm:w-1/2">
                <Label htmlFor={"city"} label={"City *"} />
                <select
                  name="city"
                  id="city"
                  className="w-full bg-gray-100 px-1 py-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}>
                  <option value="selelctCity">Select City</option>
                  {City &&
                    City.getCitiesOfState(countryCode, stateCode).map(
                      (city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      )
                    )}
                </select>
              </div>
              {/**houseAddress */}
              <br />
              <br />
              <div className="sm:w-1/2">
                <Label htmlFor={"houseAddress"} label={"House Address *"} />
                <Input
                  id={"houseAddress"}
                  name={"houseAddress"}
                  autoComplete={"houseAddress"}
                  placeholder={"House Address"}
                  required={true}
                  value={houseAddress}
                  handleChange={(newValue) => setHouseAddress(newValue)}
                />
              </div>
            </div>
            <div className="mt-5">
              <div
                className="cursor-pointer bg-red-500 w-[300px] px-2 py-2 rounded-lg text-white"
                onClick={() => setShowSaved(true)}>
                Choose From the saved address
              </div>
              {showSaved && (
                <select
                  className="w-full bg-gray-200 rounded-lg px-1 py-1 mt-4"
                  onChange={handleChooseAddress}>
                  <option value="select">select Address</option>
                  {user &&
                    user.address.map((address, i) => (
                      <option key={i} value={address.addressType}>
                        {address.addressType}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </form>
        </div>
        <div className="md:w-[60%] lg:w-[40%]  my-3 mx-2 rounded-lg  ">
          <div className="bg-white mb-8  px-6 py-6 md:px-10 md:py-4 w-full ">
            <div className="w-full flex justify-between">
              <div>Subtotal:</div>
              <div className="font-[600]">₹ {totalPrice}</div>
            </div>
            <div className="w-full flex justify-between mt-4">
              <div>Shipping:</div>
              <div className="font-[600]">{totalPrice > 500 ? "-" : "₹40"}</div>
            </div>
            <div className="w-full flex justify-between mt-4">
              <div>Discount:</div>
              <div className="font-[600]">{discount ? discount : "-"}</div>
            </div>
            <hr className="mt-4" />
            <div className="my-4 flex justify-end font-[600]">
              ₹ {finalPaymentPrice}
            </div>
            <Input
              id={"couponCode"}
              name={"couponCode"}
              placeholder={"Coupon Code"}
              handleChange={(newValue) => setCouponCode(newValue)}
            />
            <div onClick={() => handleCheckCoupon()}>
              <div className="h-[45px] w-full bg-gradient-to-r from-red-400 via-blue-500 to-red-600 mt-6 rounded-lg  "></div>
              <Button
                type={"text"}
                className={
                  " !bg-white border border-red-200 !text-red-600 -mt-[43px] !w-[98.5%] !mx-1"
                }
                text={"Apply Coupon"}
              />
            </div>
          </div>
        </div>
      </div>
      <div onClick={handleGotoPayment}>
        <Button
          className={"w-64 mb-4 !bg-black !text-white"}
          text={"Go to payment"}
        />
      </div>
    </div>
  );
};

export default Shipping;
