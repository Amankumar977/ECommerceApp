import React, { useState } from "react";
import Header from "../../components/Layouts/Header";
import Hero from "../../components/Route/Hero/Hero";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../Route/Events/Events";
import Sponsored from "../../components/Route/Sponsored/Sponsored";
import Footer from "../Layouts/Footer/Footer";
const Home = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default Home;
