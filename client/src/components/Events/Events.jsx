import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getShopEvents, handleDeleteEvent } from "../../redux/reducers/events";
import { toast } from "react-toastify";
import Loader from "../Layouts/Loader";
const Events = () => {
  const {
    events,
    isEventLoading,
    getEventFailMessage,
    getEventSuccessMessage,
  } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getEventSuccessMessage) {
      toast.success(getEventSuccessMessage);
      window.location.reload(true);
    } else {
      toast.error(getEventFailMessage);
    }
  }, [getEventSuccessMessage, getEventFailMessage]);

  useEffect(() => {
    dispatch(getShopEvents(seller.shop._id));
  }, []);
  let onDeleteEvent = (id) => {
    dispatch(handleDeleteEvent(id));
  };
  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 80, flex: 0.7 },
    { field: "Name", headerName: "Name", minWidth: 130, flex: 0.8 },
    {
      field: "OriginalPrice",
      headerName: "OriginalPrice",
      minWidth: 60,
      flex: 0.5,
    },
    {
      field: "discountedPrice",
      headerName: "discountedPrice",
      minWidth: 60,
      flex: 0.5,
    },
    { field: "stock", headerName: "Stock", minWidth: 60, flex: 0.5 },
    { field: "soldOut", headerName: "Sold Out", minWidth: 60, flex: 0.5 },
    { field: "Status", headerName: "Status", minWidth: 60, flex: 0.5 },
    {
      field: "view event",
      headerName: "",
      minWidth: 60,
      flex: 0.7,
      sortable: false,
      renderCell: () => (
        <Link>
          <Button>
            <AiOutlineEye size={15} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete event",
      headerName: "",
      minWidth: 60,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            onDeleteEvent(params.id);
          }}>
          <AiOutlineDelete size={15} />
        </Button>
      ),
    },
  ];

  const rows = [];
  events &&
    events.forEach((data) => {
      rows.push({
        id: data._id,
        Name: data.name,
        discountedPrice: data.discountedPrice,
        OriginalPrice: data.originalPrice,
        stock: data.stock,
        Status: data.status,
        soldOut: data.sold_out,
      });
    });
  return isEventLoading ? (
    <Loader />
  ) : (
    <div className="w-full mt-4 px-4 bg-white">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Events;
