import React, { useState, useEffect, useRef } from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { TiArrowSortedUp } from "react-icons/ti";

const ShowDataAdminDashBoard = ({
  heading,
  color,
  value,
  percentage,
  onOptionChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false); // Click occurred outside the component, close the box
    }
  };
  const optionList = ["Today", "This Week", "This Month", "Lifetime"];
  const handleClickChange = (option) => {
    setOpen(!open);
    onOptionChange(option, heading);
  };
  return (
    <>
      <div
        className="bg-white w-[16rem] h-[10rem] rounded-lg shadow-md px-3 relative"
        ref={ref}>
        <div
          className="mb-1 text-right text-xl cursor-pointer"
          onClick={() => setOpen(!open)}>
          ....
        </div>
        {open && (
          <>
            <div className="absolute top-[15px] right-1 text-gray-100 text-2xl">
              <TiArrowSortedUp />
            </div>
            <div className="absolute bg-gray-100 w-[6rem] h-[6rem] rounded-lg top-7 right-1 text-sm px-1">
              <ul className="space-y-1">
                {optionList &&
                  optionList.map((option) => {
                    return (
                      <li
                        key={option}
                        className="cursor-pointer hover:bg-gray-300 rounded-md"
                        onClick={() => handleClickChange(option)}>
                        {option}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </>
        )}
        <div className="flex justify-evenly items-center">
          <div className="flex flex-col gap-3">
            <h1 className="text-[15px] text-gray-500">{heading}</h1>
            <span className="text-4xl font-[500]">
              {heading.split(" ").includes("Revenue") ? `₹ ${value}` : value}
            </span>
            <div>
              {percentage > 0 ? (
                <div className="text-green-500 flex gap-2 items-center">
                  <IoIosTrendingUp /> +{percentage}
                </div>
              ) : (
                <div className="text-red-500 flex gap-2 items-center">
                  <IoIosTrendingDown /> {percentage}
                </div>
              )}
            </div>
          </div>
          <div className="text-center space-y-6">
            <span style={{ color }}>{percentage} %</span>
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: `conic-gradient(
            ${color} ${(Math.abs(percentage) / 100) * 360}deg, 
            rgb(255, 255, 255, 0)
        )`,
              }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDataAdminDashBoard;
