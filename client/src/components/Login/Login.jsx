import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/Input";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <Label
                label={"Password"}
                className="block text-sm font-medium text-gray-700"
                htmlFor={"password"}
              />
              <div className="mt-1">
                <Input
                  type={"password"}
                  name={"password"}
                  id={"password"}
                  autoComplete={"current-password"}
                  required={true}
                  value={password}
                  handleChange={(newValue) => setPassword(newValue)} // Use "handleChange" here
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
