import productModel from "../model/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export async function handleCreateProduct(req, res) {
  try {
    const {
      images,
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPercentage,
      stock,
      discountedPrice,
    } = req.body;
    if (
      (!images,
      !name,
      !description,
      !category,
      !tags,
      !originalPrice,
      !discountPercentage,
      !stock,
      !discountedPrice)
    ) {
      return next(
        new ErrorHandler("Please enter all the required fileds", 400)
      );
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}
