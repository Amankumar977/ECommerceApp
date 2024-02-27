import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllOrdersReport = () => {
  let { allOrders } = useSelector((state) => state.admin);
  const [seriesData, setSeriesData] = useState([]);
  let totalOrders = [...allOrders].reverse();
  useEffect(() => {
    const orderByMonth = {};
    allOrders.forEach((order) => {
      const createdAtDate = new Date(order.createdAt);

      const monthYear = `${
        createdAtDate.getMonth() + 1
      } - ${createdAtDate.getFullYear()}`;
      if (orderByMonth[monthYear]) {
        orderByMonth[monthYear]++;
      } else {
        orderByMonth[monthYear] = 1;
      }
    });
    const series = Object.values(orderByMonth);
    setSeriesData(series);
  }, [allOrders]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const colors = [
    "#ff1d52",
    "#4554f1",
    "#2eca6a",
    "#ff771d",
    "#71d896",
    "#f45d45",
    "#ff5ddd",
    "#ff1d52",
    "#51f50b",
    "#f5b40b",
    "#f50bcc",
    "#f50b55",
    "#240bf5",
  ];

  const data = {
    series: [
      {
        name: "monthlyData",
        data: seriesData,
      },
    ],
    options: {
      chart: {
        height: 600,
        type: "bar",
        toolbar: {
          show: true,
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          borderRadius: 3,
        },
      },
      xaxis: {
        type: "categories",
        categories: months.slice(0, seriesData.length),
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  };
  const columns = [
    { field: "id", headerName: "ID", minWidth: 80, flex: 1 },
    { field: "createdAt", headerName: "Ordered on", minWidth: 80, flex: 1 },
    { field: "finalAmount", headerName: "Amount", minWidth: 80, flex: 1 },
    {
      field: "orderStatus",
      headerName: "Ordere Status",
      minWidth: 60,
      flex: 0.8,
    },
    {
      field: "viewOrder",
      headerName: "View Order",
      minWidth: 80,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
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
  const rows = [];
  totalOrders &&
    totalOrders.map((order, i) => {
      rows.push({
        id: order._id,
        createdAt: order.createdAt.slice(0, 10),
        finalAmount: `₹ ${order.finalPaymentPrice}`,
        orderStatus: order.orderStatus,
      });
    });

  return (
    <div>
      <h1 className="text-center text-2xl my-4">Month on Month Sales</h1>
      <Chart
        options={data.options}
        series={data.series}
        type={data.options.chart.type}
        height={data.options.chart.height}
      />

      <br />
      <br />
      <hr />
      <h1 className="text-center text-2xl my-4">All Orders</h1>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        checkboxSelection
      />
    </div>
  );
};

export default AllOrdersReport;
