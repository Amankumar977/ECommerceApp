import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const AllProductsReport = () => {
  const { allOrders, allProducts } = useSelector((state) => state.admin);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    labels: [],
  });
  const [productSeries, setProductSeries] = useState([]);
  const [productOption, setProductOption] = useState({
    labels: [],
  });

  useEffect(() => {
    const productMap = {};
    allOrders &&
      allOrders.forEach((order) => {
        order.products.forEach((product) => {
          let productName = product.name.slice(0, 22);
          if (productMap[productName]) {
            productMap[productName]++;
          } else {
            productMap[productName] = 1;
          }
        });
      });
    let series = Object.values(productMap);
    let labels = Object.keys(productMap);
    setSeries(series);
    setOptions((prevOption) => ({ ...prevOption, labels }));

    const stockMap = {};
    allProducts &&
      allProducts.forEach((product) => {
        let name = product.name.slice(0, 8);
        if (stockMap[name]) {
          stockMap[name] += product.stock;
        } else {
          stockMap[name] = product.stock;
        }
      });
    const productSeries = Object.values(stockMap);
    const productLabel = Object.keys(stockMap);
    setProductSeries(productSeries);
    setProductOption((prevOption) => ({ ...prevOption, labels: productLabel }));
  }, [allOrders, allProducts]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  };

  const randomColors = generateRandomColors(productSeries.length);

  const barOptions = {
    chart: {
      height: 600,
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        borderRadius: 3,
      },
    },
    xaxis: {
      type: "categories",
      categories: productOption.labels,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  const barSeries = [
    {
      name: "Stock",
      data: productSeries,
      colors: randomColors,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl">Product wise contribution in sales</h1>
      <div>
        <Chart
          type="pie"
          series={series}
          options={options}
          width={"600"}
          height={"600"}
        />
      </div>
      <h1 className="text-3xl">Stock availability of Products</h1>
      <div className="w-full">
        <Chart
          type="bar"
          series={barSeries}
          options={barOptions}
          height={barOptions.chart.height}
        />
      </div>
    </div>
  );
};

export default AllProductsReport;
