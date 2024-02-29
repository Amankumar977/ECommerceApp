import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as echarts from "echarts";

const AllCouponsReport = () => {
  const { allCoupons } = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const chart = useRef(null);

  useEffect(() => {
    let couponMap = new Map();
    allCoupons &&
      allCoupons.forEach((coupon) => {
        if (couponMap.has(coupon.shop.name)) {
          let couponCount = couponMap.get(coupon.shop.name);
          couponMap.set(coupon.shop.name, couponCount + 1);
        } else {
          couponMap.set(coupon.shop.name, 1);
        }
      });

    const newData = [];
    for (let [key, value] of couponMap.entries()) {
      newData.push({
        value: value,
        name: key,
      });
    }
    setData(newData);
  }, [allCoupons]);

  useEffect(() => {
    if (data.length > 0) {
      if (!chart.current) {
        chart.current = echarts.init(document.getElementById("echart"));
      }
      chart.current.setOption({
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
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl ">All Coupons by shops</h1>
      <div id="echart" style={{ width: "100%", height: "550px" }}></div>
    </div>
  );
};

export default AllCouponsReport;
