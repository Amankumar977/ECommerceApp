import React from "react";

const CheckOutSteps = ({ active }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-white flex ">
        <div className="hidden sm:flex"> 1.</div> Shipping
      </div>
      {active <= 1 ? (
        <div className="w-20 bg-[#f77ea478] h-1 rounded -ml-1 -mr-1"> </div>
      ) : (
        <div className="w-20 bg-[#ff2067] h-1 rounded -ml-1"> </div>
      )}
      {active <= 1 ? (
        <div className="px-[23px] bg-[#f77ea478] py-[0.45rem] rounded-r-full  rounded-l-full text-[#ff2067] sm:flex">
          <div className="hidden sm:flex"> 2.</div> Payment
        </div>
      ) : (
        <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-[#fff] sm:flex">
          <div className="hidden sm:flex"> 2.</div> Payment
        </div>
      )}
      {active <= 2 ? (
        <div className="w-20 bg-[#f77ea478] h-1 rounded -ml-1 -mr-1"> </div>
      ) : (
        <div className="w-20 bg-[#ff2067] h-1 rounded -ml-1"> </div>
      )}
      {active <= 2 ? (
        <div className="px-[23px] bg-[#f77ea478] py-[0.45rem] rounded-r-full  rounded-l-full text-[#ff2067] sm:flex ">
          <div className="hidden sm:flex"> 3.</div>
          <div className="hidden sm:flex"> Order.</div>
          Sucess
        </div>
      ) : (
        <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-[#fff] sm:flex">
          <div className="hidden sm:flex"> 3.</div>
          <div className="hidden sm:flex"> Order.</div>
          <div>Sucess</div>
        </div>
      )}
    </div>
  );
};

export default CheckOutSteps;
