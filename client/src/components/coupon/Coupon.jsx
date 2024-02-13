import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Layouts/Loader";

const Coupon = () => {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    let handleGetShopCoupon = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER}/coupon/getShopCoupon/${
            seller.shop._id
          }`,
          { withCredentials: true }
        );
        setCoupons(response.data.coupons);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    handleGetShopCoupon();
  }, []);

  const handleDeleteCoupon = async (id) => {
    setLoading(true);
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/coupon/deleteCoupon/${id}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 10, flex: 0.7 },
    { field: "name", headerName: "Coupon Name", minWidth: 80, flex: 0.4 },
    {
      field: "percentDiscount",
      headerName: "Percent Discount",
      minWidth: 30,
      flex: 0.2,
    },
    {
      field: "startDate",
      headerName: "Start date",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "endDate",
      headerName: "End date",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "deleteCoupon",
      headerName: "",
      minWidth: 50,
      flex: 0.5,
      renderCell: (params) => (
        <Button
          onClick={() => {
            handleDeleteCoupon(params.id);
          }}>
          <AiOutlineDelete size={25} />
        </Button>
      ),
    },
  ];

  const rows = coupons.map((details) => ({
    id: details._id,
    name: details.name,
    percentDiscount: `${details.percentDiscount} %`,
    startDate:
      details.startDate &&
      new Date(details.startDate).toISOString().slice(0, 10),
    endDate:
      details.endDate && new Date(details.endDate).toISOString().slice(0, 10),
  }));

  return loading ? (
    <Loader />
  ) : (
    <div className="p-4">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default Coupon;
