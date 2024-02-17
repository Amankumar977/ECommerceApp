import React from "react";

const CheckOutSteps = ({ active }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-white z-10">
        1. Shipping
      </div>
      {active <= 1 ? (
        <div className="w-20 bg-[#f77ea478] h-1 rounded -ml-1 -mr-1"> </div>
      ) : (
        <div className="w-20 bg-[#ff2067] h-1 rounded -ml-1"> </div>
      )}
      {active <= 1 ? (
        <div className="px-[23px] bg-[#f77ea478] py-[0.45rem] rounded-r-full  rounded-l-full text-[#ff2067] z-20">
          2. Payment
        </div>
      ) : (
        <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-[#fff] z-20">
          2. Payment
        </div>
      )}
      {active <= 2 ? (
        <div className="w-20 bg-[#f77ea478] h-1 rounded -ml-1 -mr-1"> </div>
      ) : (
        <div className="w-20 bg-[#ff2067] h-1 rounded -ml-1"> </div>
      )}
      {active <= 2 ? (
        <div className="px-[23px] bg-[#f77ea478] py-[0.45rem] rounded-r-full  rounded-l-full text-[#ff2067] z-30">
          3. Order Sucess
        </div>
      ) : (
        <div className="px-[23px] bg-[#ff2067] py-[0.45rem] rounded-r-full  rounded-l-full text-[#fff] z-30">
          3. Order Sucess
        </div>
      )}
    </div>
  );
};

export default CheckOutSteps;
