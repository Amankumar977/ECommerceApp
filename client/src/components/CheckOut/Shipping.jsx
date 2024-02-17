import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../form";
import Payment from "../CheckOut/Payment";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { Country, State } from "country-state-city";
const Shipping = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  let handleCountryChange = (e) => {
    let selectedCountry = e.target.value;
    setCountry(selectedCountry);
    let nameOfCountry = Country.getAllCountries().find(
      (country) => country.name === selectedCountry
    );
    setCountryCode(nameOfCountry.isoCode);
  };
  let handleGotoPayment = () => {
    navigate("/payment");
  };
  return (
    <div className="flex justify-center items-center w-full mt-24 800px:mt-20 flex-col mx-1">
      <CheckOutSteps active={1} />
      <div className="bg-white px-2 py-2 w-[90%] my-3 mx-2">
        <h3>Shipping Address</h3>
        <form>
          <div className="mt-5">
            {/**Full Name */}
            <Label htmlFor={"name"} label={"Full name"} />
            <Input
              id={"name"}
              name={"name"}
              autoComplete={"name"}
              placeholder={"name"}
              required={true}
              value={name}
              handleChange={(newValue) => setName(newValue)}
            />
            {/**Email Address */}
            <br />
            <Label htmlFor={"email"} label={"Email"} />
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
          <div className="mt-5">
            {/**phoneNumber */}
            <Label htmlFor={"phoneNumber"} label={"Phone Number"} />
            <Input
              id={"phoneNumber"}
              name={"phoneNumber"}
              autoComplete={"phoneNumber"}
              placeholder={"Phone Number"}
              required={true}
              value={phoneNumber}
              handleChange={(newValue) => setPhoneNumber(newValue)}
            />
            {/**Email Address */}
            <br />
            <Label htmlFor={"zipCode"} label={"Zip Code"} />
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
          <div className="mt-5">
            {/**country */}
            <Label htmlFor={"country"} label={"Country"} />
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
            {/** */}
            <br />
            <br />
            <Label htmlFor={"zipCode"} label={"Zip Code"} />
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
        </form>
      </div>
    </div>
  );
};

export default Shipping;
