import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleGetShopOrder } from "../redux/reducers/orders";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopAllOrder = () => {
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetShopOrder(seller.shop._id));
  }, [dispatch]);
  const { shopOrders } = useSelector((state) => state.orders);

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

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.products.length,
        total: "₹ " + item.finalPaymentPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default ShopAllOrder;
