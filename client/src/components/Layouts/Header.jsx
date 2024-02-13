import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import Logo from "../../assets/peopely.png";
import Input from "../form/Input.jsx";
import { categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import Wishlist from "../../components/Wishlist/Wishlist";
import HeaderSidebar from "../Layouts/HeaderSidebar.jsx";
const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isProductLoading, allProducts, errorMessage } = useSelector(
    (state) => state.allProducts
  );
  const handleSearchChange = (data) => {
    setSearchTerm(data);
    if (searchTerm) {
      const filteredProducts =
        allProducts &&
        allProducts.filter((product) => {
          // Make sure product.name is a string before calling toLowerCase
          return (
            typeof product.name === "string" &&
            product.name.toLowerCase().includes(data.toLowerCase())
          );
        });
      setSearchData(filteredProducts);
    }
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <div>
      <div className={`${styles.section} z-10   `}>
        {/**Top part */}
        <div
          className={` hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between   `}>
          <div>
            <Link to="/">
              <img src={Logo} className="w-20" alt="peopelyLogo" />
            </Link>
          </div>
          {/** Search Box */}
          <div className="w-[50%] relative">
            <Input
              placeholder={"Search the product..."}
              value={searchTerm}
              handleChange={handleSearchChange}
              className={
                " hidden 800px:h-[50px] 800px:my-[20px] 800px:flex h-[40px] w-full px-2 border-2px border-[#3957db] rounded-md"
              }
              props={undefined}
              name={"Search Bar"}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-8 cursor-pointer"
            />
            {searchTerm && searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/products/${product_name}`} key={i._id}>
                        <div className="w-full flex items-start py-2 hover:bg-gray-200">
                          <img
                            src={i.images[0]}
                            alt="productImage"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/** become a seller button */}
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-white  flex items-center justify-center px-3  ">
                Become a seller
                <IoIosArrowForward className="ml-2" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/**Categories part */}
      <div
        className={`${
          active ? "shadow-sm  fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#f13f3f] h-[70px]`}>
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
          {/**Categories */}
          <div>
            <div
              className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block "
              onClick={() => setDropDown(!dropDown)}>
              <BiMenuAltLeft size={30} className="absolute top-3 left-2 " />
              <button className="h-[100%] w-full justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
              {/**Navitems */}
            </div>
          </div>
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/**Other links */}
          <div className="flex">
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenWishList(!openWishlist);
                }}>
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenCart(!openCart);
                }}>
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              {isAuthenticated ? (
                <Link to="/profile">
                  <div className="relative cursor-pointer mr-[15px]">
                    <img
                      src={`${user.avatar}`}
                      alt={`${user.avatar}`}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <div className="relative cursor-pointer mr-[15px]">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </div>
                </Link>
              )}
            </div>
            {/**Cart popup */}
            {!openWishlist && openCart ? (
              <Cart setOpenCart={setOpenCart} />
            ) : null}
            {/**WishList popup */}
            {!openCart && openWishlist ? (
              <Wishlist setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
      {/**Mobile header */}
      <div className="w-full h-[77px] fixed bg-[#ffffff] z-40 top-0 left-0 shadow-sm 800px:hidden">
        <div
          className={`${styles.section} flex items-center justify-between p-3`}>
          <div
            onClick={() => {
              setOpenSideBar(!openSidebar);
            }}>
            <BiMenuAltLeft size={50} />
          </div>
          <div>
            <Link to="/" className="hidden 400px:block">
              <img src={Logo} alt={Logo} className="w-[68px] h-[66px]" />
            </Link>
          </div>
          <div className="flex justify-between">
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenCart(!openCart);
                }}>
                <AiOutlineShoppingCart size={30} color="rgb(0 0 0 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  setOpenWishList(!openWishlist);
                }}>
                <AiOutlineHeart size={30} color="rgb(0 0 0 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex} cursor-pointer mr-[15px]`}>
              {isAuthenticated ? (
                <Link to="/profile">
                  <div className="relative cursor-pointer mr-[15px]">
                    <img
                      src={`${user.avatar}`}
                      alt={`${user.avatar}`}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </div>
                </Link>
              ) : (
                <div className="relative cursor-pointer mr-[15px]">
                  <Link to="/login">Login</Link> /
                  <Link to="sing-up">singup</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/** Open cart logic */}
      {!openWishlist && openCart ? <Cart setOpenCart={setOpenCart} /> : null}
      {!openCart && openWishlist ? (
        <Wishlist setOpenWishList={setOpenWishList} />
      ) : null}
      {/* {openSidebar && <HeaderSidebar />} */}
    </div>
  );
};

export default Header;
