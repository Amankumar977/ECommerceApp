import React from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import styles from "../styles/styles";
import CreateProduct from "../components/CreateProduct/CreateProduct";
const CreateProductPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
