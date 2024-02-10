import React, { useState } from "react";
import { Input, Label, Button } from "../form/index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { BsPersonCircle } from "react-icons/bs";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [avatar, setAvatar] = useState("");

  const onAvatarChange = (event) => {
    const img = event.target.files[0];
    setAvatar(img);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      return toast.error("Please upload a Shop Logo to continue");
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/shop/create-shop`,
        {
          name,
          email,
          password,
          avatar,
          zip,
          address,
          phone,
        },
        config
      );
      toast.success(response.data.message);
      setAddress("");
      setAvatar("");
      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
      setZip("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-Poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register to start your shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Shop Name */}
            <div>
              <Label
                label={"Shop Name"}
                htmlFor={"shopname"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1">
                <Input
                  type={"text"}
                  id={"shopname"}
                  required={true}
                  value={name}
                  handleChange={(newValue) => setName(newValue)}
                />
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <Label
                label={"Shop Number"}
                htmlFor={"phone"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1">
                <Input
                  type={"text"} // Use text type for phone number
                  id={"phone"}
                  required={true}
                  value={phone}
                  handleChange={(newValue) => setPhone(newValue)}
                />
              </div>
            </div>
            {/* Email Address */}
            <div>
              <Label
                label={"Email Address"}
                htmlFor={"email"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1">
                <Input
                  type={"email"}
                  id={"email"}
                  autoComplete={"email"}
                  required={true}
                  value={email}
                  handleChange={(newValue) => setEmail(newValue)}
                />
              </div>
            </div>
            {/* Shop Address */}
            <div>
              <Label
                label={"Shop Address"}
                htmlFor={"address"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1">
                <Input
                  type={"text"} // Use text type for address
                  id={"address"}
                  required={true}
                  value={address}
                  handleChange={(newValue) => setAddress(newValue)}
                />
              </div>
            </div>
            {/* Zip Code */}
            <div>
              <Label
                label={"Zip Code"}
                htmlFor={"zipCode"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1">
                <Input
                  type={"text"} // Use text type for zip code
                  id={"zipCode"}
                  required={true}
                  value={zip}
                  handleChange={(newValue) => setZip(newValue)}
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <Label
                label={"Password"}
                htmlFor={"password"}
                className="block text-sm font-medium text-gray-700"
              />
              <div className="mt-1 relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id={"password"}
                  autoComplete={"current-password"}
                  required={true}
                  value={password}
                  handleChange={(newValue) => setPassword(newValue)}
                />
                {showPassword ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={25}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    size={25}
                  />
                )}
              </div>
            </div>
            {/* Shop Logo */}
            <div>
              <Label label={"Shop Logo"} htmlFor={"avatar"} />
              <div className="flex items-center justify-between mt-4">
                {avatar ? (
                  <div className="w-14 h-14 rounded-full">
                    <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                  </div>
                ) : (
                  <BsPersonCircle className="w-14 h-14 rounded-full" />
                )}
                <input
                  type={"file"}
                  id={"avatar"}
                  className={"ml-4 mt-4"}
                  onChange={onAvatarChange}
                  accept="image/*"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <Button
                className={`group relative`}
                type={"submit"}
                text={"Submit"}
              />
            </div>
            {/* Link to Login */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
