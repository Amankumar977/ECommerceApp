import React, { useEffect } from "react";
import Home from "../components/Home/Home";
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
