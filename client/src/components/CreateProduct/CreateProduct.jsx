import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [stock, setStock] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    // Calculate the discounted price whenever discountPercentage changes
    let discount_price = (originalPrice * discountPercentage) / 100;
    setDiscountedPrice(Math.round(originalPrice - discount_price));
  }, [originalPrice, discountPercentage]); // Re-run the effect whenever originalPrice or discountPercentage changes
  let handleImageChange = (e) => {
    if (images.length === 4) {
      return toast.error("More than 4 images are not allowed");
    }
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <div className=" w-[90%] 800px:w-[50%] bg-white h-[80vh] rounded p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <Label
            htmlFor={"name"}
            className={"pb-2"}
            label={
              <div>
                Name Of the product <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"name"}
            required={true}
            type={"text"}
            placeholder={"cycle, bag etc..."}
            handleChange={(newValue) => setName(newValue)}
          />
        </div>
        <br />
        <div>
          <Label
            htmlFor={"description"}
            className={"pb-2"}
            label={
              <div>
                description Of the product{" "}
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"description"}
            required={true}
            type={"text"}
            placeholder={"Cycle with 5 colours and many shades"}
            handleChange={(newValue) => setDescription(newValue)}
          />
        </div>
        <br />
        <div>
          <Label
            htmlFor={"category"}
            className={"pb-2"}
            label={
              <div>
                Category Of the product
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
            value={category}
            className="bg-gray-400 px-3 py-3 mt-1 rounded-md w-full text-[#000000]">
            {categoriesData.map((data) => (
              <option key={data.id} value={data.value}>
                {data.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <Label
            htmlFor={"tags"}
            className={"pb-2"}
            label={
              <div>
                Tags
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"tags"}
            required={true}
            className={"mt-1"}
            type={"text"}
            placeholder={"#cycle , #bike"}
            handleChange={(newValue) => setTags(newValue)}
          />
        </div>
        <br />
        <div>
          <Label
            htmlFor={"originalPrice"}
            className={"pb-2"}
            label={
              <div>
                Original Price
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"originalPrice"}
            required={true}
            className={"mt-1"}
            type={"number"}
            placeholder={"₹1000...."}
            handleChange={(newValue) => setOriginalPrice(newValue)}
          />
        </div>
        {/**Discount price */}
        <br />
        <div className="flex gap-20">
          <div>
            <Label
              htmlFor={"discountPercentage"}
              className={"pb-2"}
              label={
                <div>
                  Discount Percentage
                  <span className="text-red-500">*</span>
                </div>
              }
            />
            <Input
              id={"discountPercentage"}
              required={true}
              className={"mt-1"}
              type={"number"}
              placeholder={"10%"}
              handleChange={(newValue) => {
                setDiscountPercentage(newValue);
              }}
            />
          </div>
          <div>
            <Label
              htmlFor={"discountedPrice"}
              className={"pb-2"}
              label={
                <div>
                  Discounted Price
                  <span className="text-red-500">*</span>
                </div>
              }
            />
            <Input
              id={"discountedPrice"}
              required={true}
              readOnly={true}
              className={"mt-1"}
              value={isNaN(discountedPrice) ? "" : discountedPrice}
              type={"number"}
            />
          </div>
        </div>
        <br />
        <div>
          <Label
            htmlFor={"stock"}
            className={"pb-2"}
            label={
              <div>
                Product Stock
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"stock"}
            required={true}
            className={"mt-1"}
            type={"number"}
            placeholder={"10000"}
            handleChange={(newValue) => setStock(newValue)}
          />
        </div>
        {/**Upload Images */}
        <br />
        <div>
          <Label
            htmlFor={"images"}
            label={
              <div>
                Upload Images
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <input
            type="file"
            id={"upload"}
            className={"hidden"}
            multiple={true}
            onChange={(e) => handleImageChange(e)}
          />
          <label htmlFor="upload">
            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
          </label>
          {images && (
            <div className="flex mt-4 gap-3 border mix-blend-multiply">
              {images.map((imga, i) => (
                <img
                  src={URL.createObjectURL(imga)}
                  key={i}
                  alt={imga}
                  className="h-[120px] w-[120px] object-contain rounded-sm m-2 "
                />
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
