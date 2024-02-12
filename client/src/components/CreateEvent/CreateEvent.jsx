import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { Button } from "../form";
import Loader from "../Layouts/Loader";
const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
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
  let handleStartDateChange = (newValue) => {
    const today = new Date(); // Get today's date
    const startDate = new Date(newValue);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("endDate").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length <= 1) {
      return toast.error("Images needs to be atleast 2.");
    }
    if (!seller) {
      return toast.error("Seller information is missing.");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      images.forEach((files) => {
        formData.append("images", files);
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("originalPrice", originalPrice);
      formData.append("stock", stock);
      formData.append("discountedPrice", discountedPrice);
      formData.append("discountPercentage", discountPercentage);
      formData.append("shopId", seller.shop._id);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      await axios
        .post(
          `${import.meta.env.VITE_SERVER}/events/create-event`,
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          setCategory("");
          setDescription("");
          setDiscountPercentage("");
          setDiscountedPrice("");
          setImages([]);
          setLoading("");
          setName("");
          setOriginalPrice("");
          setStock("");
          setTags("");
          setEndDate(null);
          setStartDate(null);
          navigate("/dashboard/events");
        })
        .catch((error) => {
          toast.error(error.response.data.mesage);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className=" w-[90%] 800px:w-[50%] bg-white h-[80vh] rounded p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create event</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <Label
            htmlFor={"name"}
            className={"pb-2"}
            label={
              <div>
                Name Of the event <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"name"}
            required={true}
            type={"text"}
            value={name}
            placeholder={"cycle, bag etc..."}
            handleChange={(newValue) => setName(newValue)}
          />
        </div>
        <br />
        <div>
          <Label
            htmlFor={"description"}
            className={"pb-2 mb-1"}
            label={
              <div>
                description Of the event <span className="text-red-500">*</span>
              </div>
            }
          />
          <textarea
            id={"description"}
            rows={4}
            required={true}
            type={"text"}
            value={description}
            className=" px-2 mt-1 border border-[#555] rounded-md outline-none w-full"
            placeholder={"Description are very essential for event visibilty"}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />
        <div>
          <Label
            htmlFor={"category"}
            className={"pb-2"}
            label={
              <div>
                Category Of the event
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
            <option value={"Select"}>Select the category.....</option>
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
            value={tags}
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
            value={originalPrice}
            handleChange={(newValue) => setOriginalPrice(newValue)}
          />
        </div>
        {/**Discount price */}
        <br />
        <div className="flex gap-20 items-center ">
          <div>
            <Label
              htmlFor={"discountPercentage"}
              className={"pb-2"}
              label={
                <div>
                  Discount %<span className="text-red-500">*</span>
                </div>
              }
            />
            <Input
              id={"discountPercentage"}
              required={true}
              className={"mt-1"}
              type={"number"}
              placeholder={"10%"}
              value={discountPercentage}
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
                event Stock
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"stock"}
            required={true}
            className={"mt-1"}
            type={"number"}
            value={stock}
            placeholder={"10000"}
            handleChange={(newValue) => setStock(newValue)}
          />
        </div>
        {/**Start Date */}
        <br />
        <div>
          <Label
            htmlFor={"startDate"}
            className={"pb-2"}
            label={
              <div>
                Start Date
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"startDate"}
            required={true}
            className={"mt-1"}
            type={"date"}
            placeholder={"11-04-2023"}
            min={new Date().toISOString().slice(0, 10)}
            handleChange={(newValue) => handleStartDateChange(newValue)}
          />
        </div>
        {/**end Date */}
        <br />
        <div>
          <Label
            htmlFor={"endDate"}
            className={"pb-2"}
            label={
              <div>
                End Date
                <span className="text-red-500">*</span>
              </div>
            }
          />
          <Input
            id={"endDate"}
            name={"endDate"}
            required={true}
            className={"mt-1"}
            type={"date"}
            placeholder={"14-02-2024"}
            handleChange={(newValue) => {
              setEndDate(newValue);
            }}
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
            id={"images"}
            name="images"
            className={"hidden"}
            multiple={true}
            onChange={(e) => handleImageChange(e)}
          />
          <label htmlFor="images">
            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
          </label>
          {images && (
            <div className="flex mt-4 gap-3 border mix-blend-multiply w-full  ">
              {images.map((imga, i) => (
                <div key={i}>
                  <img
                    src={URL.createObjectURL(imga)}
                    alt={imga}
                    className="h-[80px] w-[80px] 800px:h-[110px] 800px:w-[110px] object-contain rounded-sm m-2 "
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          className={"!bg-black text-white font-[300] text-[18px]"}
          text={"Create event"}
          type={"submit"}
        />
      </form>
    </div>
  );
};

export default CreateEvent;
