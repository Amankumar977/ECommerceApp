import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const AllEventsReport = () => {
  const { allEvents } = useSelector((state) => state.admin);
  const [eventsSeries, setEventsSeries] = useState([]);
  const [eventsOptions, setEventsOptions] = useState({ labels: [] });
  const [eventData, setEventData] = useState(null);
  useEffect(() => {
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
  }, [allEvents]);
  useEffect(() => {
    if (eventsSeries.length > 0) {
      const newData = {
        series: [...eventsSeries],
        options: {
          chart: {
            type: "donut",
            width: 600,
            height: 600,
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
  const columns = [
    {
      field: "id",
      headerName: "Shop Id",
      minWidth: 80,
      flex: 0.8,
    },
    {
      field: "shopName",
      headerName: "Shop Name",
      minWidth: 80,
      flex: 0.8,
    },
    {
      field: "price",
      headerName: "sellingPrice",
      minWidth: 80,
      flex: 0.8,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      minWidth: 80,
      flex: 0.8,
    },
    {
      field: "endDate",
      headerName: "End Date",
      minWidth: 80,
      flex: 0.8,
    },
  ];
  const rows = [];
  allEvents &&
    allEvents.map((event) => {
      rows.push({
        id: event.shop._id,
        shopName: event.shop.name,
        price: event.discountedPrice,
        startDate: event.startDate.slice(0, 10),
        endDate: event.endDate.slice(0, 10),
      });
    });
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h1 className="text-2xl">Total Events by per shop</h1>
      <div>
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
      <div className="w-full">
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </div>
  );
};

export default AllEventsReport;
