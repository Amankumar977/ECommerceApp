import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsShop,
  handledeleteProduct,
} from "../../redux/reducers/products";
import Loader from "../Layouts/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products, isProductLoading, message, deleteErrorMessage } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller.shop._id));
  }, [dispatch]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      window.location.reload(true);
    } else if (deleteErrorMessage) {
      toast.error(deleteErrorMessage);
    }
  }, [message, deleteErrorMessage]);
  const handleDeleteProduct = (id) => {
    dispatch(handledeleteProduct(id));
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 10, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 70, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold out", minWidth: 80, flex: 0.5 },
    {
      field: "preview",
      headerName: "",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const name = params.row.name;
        const productName = name.replace(/\s+/g, "-");
        return (
          <Link to={`/products/${productName}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            handleDeleteProduct(params.id);
          }}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  let rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.discountedPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return isProductLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
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

export default AllProducts;
