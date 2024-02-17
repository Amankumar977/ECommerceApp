import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/styles";
import ShopInfo from "../components/ShopInfo/ShopInfo";
import ShopProfileData from "../components/ShopProfileData/ShopProfileData";
import { getAllProductsShop } from "../redux/reducers/products";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../components/Layouts/Loader";
const ShopPreviewPage = () => {
  const [shopDetail, setShopDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllProductsShop(id));
    let getShop = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER}/shop/shopPreview/${id}`
        );
        setShopDetail(response.data.shop);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getShop();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[35%] 800px:w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} id={id} />
        </div>
        <div className="w-[65%] 800px:w-[75%] rounded-md">
          <ShopProfileData isOwner={false} id={id} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
