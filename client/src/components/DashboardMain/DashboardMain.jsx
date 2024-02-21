import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { BsCollection } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { handleGetShopOrder } from "../../redux/reducers/orders";
import { getAllProductsShop } from "../../redux/reducers/products";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layouts/Loader";
const DashboardMain = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { shopOrders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(handleGetShopOrder(seller.shop._id));
    dispatch(getAllProductsShop(seller.shop._id));
  }, [dispatch, seller.shop._id]); // Include dependencies in the dependency array

  useEffect(() => {
    const orderData =
      shopOrders &&
      shopOrders.filter(
        (item) =>
          item.orderStatus === "Delivered" && item.PaymentStatus === "Received"
      );
    setDeliveredOrder(orderData);
    setLoading(false);
  }, [shopOrders]); // Include shopOrders as a dependency

  if (loading) {
    return <Loader />;
  }
  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((total, item) => item.finalPaymentPrice + total, 0);
  const totalEarningAfterTaxAndServiceCharge =
    totalEarningWithoutTax - totalEarningWithoutTax * 0.2;
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return "status" === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Check Details",
      flex: 1,
      minWidth: 150,
      headerName: "Check Details By Clicking below",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/order/${params.id}`}>
              <button
                className={
                  "bg-[#ffffff] text-gray-400 w-[50px] px-2 py-2 rounded-lg"
                }>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  let shopArrayOrders = [];
  shopOrders && shopOrders.map((item) => shopArrayOrders.push(item));
  let shopOrder = shopArrayOrders.reverse();
  shopOrder &&
    shopOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.products.length,
        total: "₹ " + item.finalPaymentPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="w-full p-8 ">
      <h3 className="text-[22px] font-Poppins mb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#5e5e60]`}>
              Account Balance{" "}
              <span className="text-[16px]">with 10% service charges </span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ₹ {totalEarningAfterTaxAndServiceCharge}
          </h5>
          <Link to={"/dashboard/withdraw-money"}>
            <h5 className="pt-4 pl2 text-[#077f9c]">Withdraw money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <FaCartShopping size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#5e5e60] ml-3`}>
              All Orders{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shopOrders?.length}
          </h5>
          <Link to={"/dashboard/orders"}>
            <h5 className="pt-4 pl2 text-[#077f9c]">View all orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BsCollection size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#5e5e60] ml-3`}>
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products?.length}
          </h5>
          <Link to={"/dashboard/products"}>
            <h5 className="pt-4 pl2 text-[#077f9c]">View all products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2"> Latest Order</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardMain;
