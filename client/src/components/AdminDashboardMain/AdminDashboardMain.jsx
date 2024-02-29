import React, { useEffect, useState } from "react";
import ShowDataAdminDashBoard from "../../components/ShowDataAdminDashBoard/ShowDataAdminDashBoard.jsx";
import { useSelector } from "react-redux";
import Loader from "../Layouts/Loader.jsx";
import { CiHome } from "react-icons/ci";
import { TbChartSankey } from "react-icons/tb";
import Chart from "react-apexcharts";
import AllOrdersReport from "./AllOrdersReport";
import AllShopReport from "./AllShopReport";
import AllCustomersReport from "./AllCustomersReport";
import AllProductsReport from "./AllProductsReport";
import AllEventsReport from "./AllEventsReport";
import AllCouponsReport from "./AllCouponsReport";
const AdminDashboardMain = ({ active }) => {
  const {
    todayOrders,
    weekOrders,
    monthOrders,
    allOrders,
    todayCreatedProducts,
    weekCreatedProducts,
    monthCreatedProducts,
    allProducts,
    todayCustomers,
    weekCustomers,
    monthCustomers,
    allCustomers,
    allEvents,
  } = useSelector((state) => state.admin);
  if (
    !todayOrders ||
    !weekOrders ||
    !monthOrders ||
    !allOrders ||
    !todayCreatedProducts ||
    !weekCreatedProducts ||
    !monthCreatedProducts ||
    !allProducts ||
    !todayCustomers ||
    !weekCustomers ||
    !monthCustomers ||
    !allCustomers ||
    !allEvents
  ) {
    return <Loader />;
  }
  return (
    <div className="mt-4 pl-1 md:pl-6 pr-2">
      {active == 1 && (
        <div>
          <ActiveOneContent />
          <ReportsChart />
        </div>
      )}
      {active === 2 && (
        <>
          <AllOrdersReport />
        </>
      )}
      {active === 3 && (
        <>
          <AllShopReport />
        </>
      )}
      {active === 4 && (
        <>
          <AllCustomersReport />
        </>
      )}
      {active === 5 && (
        <>
          <AllProductsReport />
        </>
      )}
      {active === 6 && (
        <>
          <AllEventsReport />
        </>
      )}
      {active === 7 && (
        <>
          <AllCouponsReport />
        </>
      )}
    </div>
  );
};
let ActiveOneContent = () => {
  const {
    todayOrders,
    weekOrders,
    monthOrders,
    allOrders,
    todayCreatedProducts,
    weekCreatedProducts,
    monthCreatedProducts,
    allProducts,
    todayCustomers,
    weekCustomers,
    monthCustomers,
    allCustomers,
  } = useSelector((state) => state.admin);
  const [userHeading, setUserHeading] = useState(" ");
  const [userValue, setUserValue] = useState(todayCustomers?.length);
  const [revenueHeading, setRevenueHeading] = useState(" ");
  const [revenueValue, setRevenueValue] = useState(" ");
  const [productsHeading, setProductsHeading] = useState(" ");
  const [productsValue, setProductsValue] = useState(
    todayCreatedProducts?.length
  );
  const [ordersHeading, setOrdersHeading] = useState(" ");
  const [ordersValue, setOrdersValue] = useState(todayOrders?.length);
  useEffect(() => {
    const todayRevenue = todayOrders?.reduce(
      (total, item) => total + item.finalPaymentPrice,
      0
    );
    setRevenueValue(todayRevenue);
  }, [todayOrders]);
  const handleRevenueChange = (option) => {
    if (option === "This Week") {
      setRevenueHeading("This Week's Revenue");
      const weekRevenue = weekOrders.reduce(
        (total, item) => total + item.finalPaymentPrice,
        0
      );
      setRevenueValue(weekRevenue);
    } else if (option === "This Month") {
      setRevenueHeading("This Month's Revenue");
      const monthRevenue = monthOrders.reduce(
        (total, item) => total + item.finalPaymentPrice,
        0
      );
      return setRevenueValue(monthRevenue);
    } else if (option === "Today") {
      setRevenueHeading("Today's Revenue");
      const todayRevenue = todayOrders.reduce(
        (total, item) => total + item.finalPaymentPrice,
        0
      );
      return setRevenueValue(todayRevenue);
    } else {
      setRevenueHeading("LifeTime Revenue");
      const lifetimeRevenue = allOrders.reduce(
        (total, item) => total + item.finalPaymentPrice,
        0
      );
      return setRevenueValue(lifetimeRevenue);
    }
  };
  const handleUsersChange = (option) => {
    if (option === "This Week") {
      setUserHeading("Week's new Users ");
      return setUserValue(weekCustomers.length);
    } else if (option === "This Month") {
      setUserHeading("Months's new Users ");
      return setUserValue(monthCustomers.length);
    } else if (option === "Today") {
      setUserHeading("Today's new Users");
      return setUserValue(todayCustomers.length);
    } else {
      setUserHeading("Lifetime total Users");
      return setUserValue(allCustomers.length);
    }
  };
  const handleProductsChange = (option) => {
    if (option === "This Week") {
      setProductsHeading("Week's new Products");
      return setProductsValue(weekCreatedProducts.length);
    } else if (option === "This Month") {
      setProductsHeading("Months new Products");
      return setProductsValue(monthCreatedProducts.length);
    } else if (option === "Today") {
      setProductsHeading("Today's new Products");
      return setProductsValue(todayCreatedProducts.length);
    } else {
      setProductsHeading("Lifetime total Products");
      return setProductsValue(allProducts.length);
    }
  };
  function handleOrdersChange(option) {
    if (option === "This Week") {
      setOrdersHeading("Week's new Orders ");
      return setOrdersValue(weekOrders.length);
    } else if (option === "This Month") {
      setOrdersHeading("Months's new Orders ");
      return setOrdersValue(monthOrders.length);
    } else if (option === "Today") {
      setOrdersHeading("Today's new Orders");
      return setOrdersValue(todayOrders.length);
    } else {
      setOrdersHeading("Lifetime total Orders");
      return setOrdersValue(allOrders.length);
    }
  }
  const handleOptionChange = (option, heading) => {
    if (heading.split(" ").includes("Revenue")) {
      return handleRevenueChange(option);
    } else if (heading.split(" ").includes("Users")) {
      return handleUsersChange(option);
    } else if (heading.split(" ").includes("Products")) {
      return handleProductsChange(option);
    } else {
      return handleOrdersChange(option);
    }
  };
  return (
    <div>
      <div className="w-full">
        <h3 className="text-2xl text-[#555757] flex gap-4 items-center">
          Dashboard <CiHome />
        </h3>
      </div>
      <div className=" w-full flex justify-between items-center flex-wrap gap-3 mt-3">
        <ShowDataAdminDashBoard
          heading={revenueHeading != " " ? revenueHeading : "Today's Revenue"}
          color={"#7264e0"}
          value={revenueValue}
          percentage={40}
          onOptionChange={handleOptionChange}
        />
        <ShowDataAdminDashBoard
          heading={userHeading === " " ? "Today's new Users" : userHeading}
          color={"#4be6a0"}
          value={userValue}
          percentage={80}
          onOptionChange={handleOptionChange}
        />
        <ShowDataAdminDashBoard
          heading={
            productsHeading === " " ? "Today's new Products" : productsHeading
          }
          color={"#f0f037"}
          value={productsValue}
          percentage={10}
          onOptionChange={handleOptionChange}
        />
        <ShowDataAdminDashBoard
          heading={ordersHeading === " " ? "Today's new orders" : ordersHeading}
          color={"#e6463e"}
          value={ordersValue}
          percentage={-14}
          onOptionChange={handleOptionChange}
        />
      </div>
    </div>
  );
};
let ReportsChart = () => {
  const { allOrders, allProducts } = useSelector((state) => state.admin);
  // area graph chart
  const [data, setData] = useState({
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 86, 56],
      },
      {
        name: "Revenue",
        data: [11, 32, 45, 25, 42, 89, 16],
      },
      {
        name: "Customers",
        data: [15, 11, 32, 18, 9, 89, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4554f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-02-04T00:00:00.000Z",
          "2024-02-04T01:30:00.000Z",
          "2024-02-04T02:30:00.000Z",
          "2024-02-04T03:30:00.000Z",
          "2024-02-04T04:30:00.000Z",
          "2024-02-04T05:30:00.000Z",
          "2024-02-04T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const [options, setOptions] = useState({
    labels: [],
  });
  const [series, setSeries] = useState([]);
  const [productOption, setProductOption] = useState({
    labels: [],
  });
  const [productSeries, setProductSeries] = useState([]);
  useEffect(() => {
    const categories = {};
    allOrders.forEach((order) => {
      order.products.forEach((product) => {
        if (categories[product.category]) {
          categories[product.category]++;
        } else {
          categories[product.category] = 1;
        }
      });
    });
    const seriesData = Object.values(categories);
    const labels = Object.keys(categories);
    setSeries(seriesData);
    setOptions((prevOptions) => ({ ...prevOptions, labels }));
    const productCategories = {};
    allProducts.forEach((product) => {
      if (productCategories[product.category]) {
        productCategories[product.category]++;
      } else {
        productCategories[product.category] = 1;
      }
    });
    const productSeriesData = Object.values(productCategories);
    const productLabelData = Object.keys(productCategories);
    setProductSeries(productSeriesData);
    setProductOption((prevOption) => ({
      ...prevOption,
      labels: productLabelData,
    }));
  }, [allOrders, allProducts]);

  // bar graph chart
  return (
    <>
      <h1 className="text-[#515351] mt-5 text-3xl flex items-center gap-4">
        Reports <TbChartSankey />
      </h1>

      <div className=" w-full  bg-white rounded-md mt-3">
        <Chart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      </div>
      <div className=" w-full  mt-6 flex items-center justify-center flex-col rounded-md">
        <h1 className="text-2xl">Categories wise contribution in orders</h1>
        <Chart
          options={options}
          series={series}
          type="donut"
          width="550"
          height="450"
        />
      </div>
      <div className="w-full flex justify-center items-center flex-col mt-6">
        <h1 className="text-2xl">
          Categories wise contribution in total products
          <Chart
            series={productSeries}
            options={productOption}
            width={"550"}
            height={"450"}
            type="pie"
          />
        </h1>
      </div>
    </>
  );
};
export default AdminDashboardMain;
