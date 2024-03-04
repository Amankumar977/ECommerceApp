import React, { useState } from "react";
import { Input, Label, Button } from "../form/index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_SERVER}/shop/login-shop`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Login Sucessfull");
          navigate("/dashboard");
          window.location.reload(true);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-Poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <Label
                label={"Email Address"}
                className="block text-sm font-medium text-gray-700"
                htmlFor={"email"}
              />
              <div className="mt-1">
                <Input
                  type={"email"}
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
            {/* Remember me button */}
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 rounded "
                />
                <Label
                  label={"Remember Me"}
                  htmlFor={"remember"}
                  className={"ml-2 block text-sm text-gray-900"}
                />
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password
                </a>
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
              <h4>Not Have an account ? </h4>
              <Link to="/shop-create" className="text-blue-600 pl-2">
                SingUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
