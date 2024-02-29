import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as echarts from "echarts";
import { DataGrid } from "@mui/x-data-grid";

const AllCustomersReport = () => {
  const { allOrders, allCustomers } = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    const productMap = new Map();
    allOrders.forEach((order) => {
      order.products.forEach((product) => {
        let name = product.name.slice(0, 25);
        if (productMap.has(name)) {
          let productCount = productMap.get(name);
          productMap.set(name, productCount + 1); // Correct the increment
        } else {
          productMap.set(name, 1);
        }
      });
    });
    let newData = [];
    for (let [key, value] of productMap.entries()) {
      newData.push({ value: value, name: key });
    }
    setData(newData);
  }, [allOrders]);

  useEffect(() => {
    if (data.length > 0) {
      if (!chartRef.current) {
        chartRef.current = echarts.init(document.getElementById("myChart"));
      }
      chartRef.current.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      });
    }
  }, [data]);
  const columns = [
    { field: "id", headerName: "ID", minWidth: 80, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 80, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 130, flex: 0.8 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 1,
    },
  ];
  const rows = [];
  allCustomers &&
    allCustomers.map((customer) => {
      rows.push({
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
      });
    });
  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl">Products bought by customers</h1>
      <div id="myChart" style={{ width: "100%", height: "400px" }}></div>
      <h1 className="text-3xl">All Customers</h1>
      <div style={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </div>
  );
};

export default AllCustomersReport;
