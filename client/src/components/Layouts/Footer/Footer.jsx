import React from "react";
import Input from "../../form/Input";
import Logo from "../../../assets/peopely.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={`bg-black text-white `}>
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe </span>
          <span>
            us for latest news <br />
            events and offers.
          </span>
        </h1>
        <div className=" md:flex gap-5">
          <Input
            type={"email"}
            required={true}
            placeholder={"Enter you email"}
            className={
              "text-gray-800 md:w-80 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            }
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-1 rounded-md text-white md:w-auto w-full ">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 ms:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-12 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex  flex-col items-center justify-center ">
          <img
            src={Logo}
            alt="peopelyLogo"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="flex items-center mt-3">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-2xl ">COMPANY</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name} className="pt-6">
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 cursor-pointer leading-6 text-2xl ">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-2xl capitalize">SHOP</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name} className="pt-6">
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 cursor-pointer leading-6 text-2xl ">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-2xl ">SUPPORT</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name} className="pt-6">
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 cursor-pointer leading-6 text-2xl ">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2024 Peopely. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
