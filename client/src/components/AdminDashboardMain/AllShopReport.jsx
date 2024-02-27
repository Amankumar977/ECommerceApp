import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const AllShopReport = () => {
  const { allOrders, allProducts, allEvents } = useSelector(
    (state) => state.admin
  );

  const [orderSeries, setOrderSeries] = useState([]);
  const [orderOptions, setOrderOptions] = useState({ labels: [] });
  const [productSeries, setProductSeries] = useState([]);
  const [productOptions, setProductOptions] = useState({ labels: [] });
  const [eventsSeries, setEventsSeries] = useState([]);
  const [eventsOptions, setEventsOptions] = useState({ labels: [] });
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const orderCategories = {};
    allOrders.forEach((order) => {
      order.products.forEach((product) => {
        if (orderCategories[product.shop.name]) {
          orderCategories[product.shop.name]++;
        } else {
          orderCategories[product.shop.name] = 1;
        }
      });
    });
    const orderSeries = Object.values(orderCategories);
    const orderOptions = Object.keys(orderCategories);
    setOrderSeries(orderSeries);
    setOrderOptions({ labels: orderOptions });

    const productCategories = {};
    allProducts.forEach((product) => {
      if (productCategories[product.shop.name]) {
        productCategories[product.shop.name]++;
      } else {
        productCategories[product.shop.name] = 1;
      }
    });
    const productSeries = Object.values(productCategories);
    const productOptions = Object.keys(productCategories);
    setProductSeries(productSeries);
    setProductOptions({ labels: productOptions });

    const eventsCategories = {};
    allEvents &&
      allEvents.forEach((event) => {
        if (eventsCategories[event.shop.name]) {
          eventsCategories[event.shop.name]++;
        } else {
          eventsCategories[event.shop.name] = 1;
        }
      });
    const eventsSeries = Object.values(eventsCategories);
    const eventsOptions = Object.keys(eventsCategories);
    setEventsSeries(eventsSeries);
    setEventsOptions({ labels: eventsOptions });
  }, [allOrders, allProducts, allEvents]);

  useEffect(() => {
    if (eventsSeries.length > 0) {
      const newData = {
        series: [...eventsSeries],
        options: {
          chart: {
            type: "donut",
            width: 500,
            height: 500,
            dropShadow: {
              enabled: true,
              color: "#111",
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2,
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: { show: true, total: { showAlways: true, show: true } },
              },
            },
          },
          labels: eventsOptions.labels,
          dataLabels: { dropShadow: { blur: 3, opacity: 0.8 } },
          fill: {
            type: "pattern",
            opacity: 1,
            pattern: {
              enabled: true,
              style: [
                "verticalLines",
                "squares",
                "horizontalLines",
                "circles",
                "slantedLines",
                "verticalLines",
                "squares",
                "horizontalLines",
                "circles",
                "slantedLines",
                "verticalLines",
                "squares",
                "horizontalLines",
                "circles",
                "slantedLines",
              ],
            },
          },
          states: { hover: { filter: "none" } },
          theme: { palette: "palette2" },
          title: { text: "Events by each shop" },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 200 },
                legend: { position: "bottom" },
              },
            },
          ],
        },
      };
      setEventData(newData);
    }
  }, [eventsSeries, eventsOptions]);

  return (
    <div className="px-2 flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl my-6">Order Contribution by per shop</h1>
      <Chart
        type="pie"
        series={orderSeries}
        options={orderOptions}
        width={500}
        height={500}
      />
      <h1 className="text-2xl">Total products by per shop</h1>
      <Chart
        type="donut"
        series={productSeries}
        options={productOptions}
        width={500}
        height={500}
      />
      <h1 className="text-2xl">Total Events by per shop</h1>
      {eventData && (
        <Chart
          type={eventData.options.chart.type}
          series={eventData.series}
          options={eventData.options}
          height={eventData.options.chart.height}
          width={eventData.options.chart.width}
        />
      )}
    </div>
  );
};

export default AllShopReport;
