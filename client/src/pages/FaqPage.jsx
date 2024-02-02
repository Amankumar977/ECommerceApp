import React from "react";
import FAQ from "../components/FAQ/FAQ";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
const FaqPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};

export default FaqPage;
