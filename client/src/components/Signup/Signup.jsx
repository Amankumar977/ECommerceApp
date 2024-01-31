import React, { useState } from "react";
import { Input, Label, Button } from "../form/index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSubmit = async (e) => {
    if (!avatar) {
      toast.error(
        "Please select a beautiful picture of yours as it is required 😊"
      );
    }
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };
    // Fix: change "Headers" to "headers"
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", fullName);
    newForm.append("email", email);
    newForm.append("password", password);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/user/create-user`,
        newForm,
        config
      );
      toast.success(response.data.message);
      setAvatar(null);
      setEmail("");
      setFullName("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while processing your request");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-Poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/** Full Name Input */}
            <div>
              <Label
                label={"Full Name"}
                className="block text-sm font-medium text-gray-700"
                htmlFor={"fullName"}
              />
              <div className="mt-1">
                <Input
                  type={"text"}
                  name={"fullName"}
                  id={"fullName"}
                  autoComplete={"name"}
                  required={true}
                  value={fullName}
                  handleChange={(newValue) => setFullName(newValue)} // Use "handleChange" here
                />
              </div>
            </div>
            {/* Email Input */}
            <div>
              <Label
                label={"Email Address"}
                className="block text-sm font-medium text-gray-700"
                htmlFor={"email"}
              />
              <div className="mt-1">
                <Input
                  type={"text"}
                  name={"email"}
                  id={"email"}
                  autoComplete={"email"}
                  required={true}
                  value={email}
                  handleChange={(newValue) => setEmail(newValue)} // Use "handleChange" here
                />
              </div>
            </div>
            {/* Password Input*/}
            <div>
              <Label
                label={"Password"}
                className="block text-sm font-medium text-gray-700"
                htmlFor={"password"}
              />
              <div className="mt-1 relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name={"password"}
                  id={"password"}
                  autoComplete={"current-password"}
                  required={true}
                  value={password}
                  handleChange={(newValue) => setPassword(newValue)} // Use "handleChange" here
                />
                {showPassword ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    size={25}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    size={25}
                  />
                )}
              </div>
            </div>
            {/* Upload Image */}
            <div>
              <div>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-x-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor={"fileInput"}
                    className="ml-5 flex items-center justify-center px-4 py-2
                    border border-gray-300 rounded-md shadow-sm text-sm
                    font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="ml-4 sr-only"
                      accept=".jpg, .jpeg, .png"
                      id={"fileInput"}
                      onChange={handleAvatarChange} // Corrected function name
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <Button
                className={`group relative `}
                type={"submit"}
                text={"Submit"}
              />
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already Have an account ? </h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
