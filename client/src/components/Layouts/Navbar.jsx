import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((link, i) => (
          <div className="flex" key={i}>
            <Link
              to={link.url}
              className={`${
                active === 1 + i
                  ? "text-[#202320]"
                  : "text-[#fff] font-[500] px-6 cursor-pointer"
              }`}>
              {link.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
