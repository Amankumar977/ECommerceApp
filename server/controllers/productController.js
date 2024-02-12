import productModel from "../model/productModel.js";
import shopModel from "../model/shopModel.js";
import uploadOnCloudinary, {
  deleteImagefromCloudinary,
} from "../utils/cloudinary.js";

export async function handleCreateProduct(req, res) {
  try {
    const {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPercentage,
      stock,
      discountedPrice,
      shopId,
    } = req.body;
    const images = req.files;
    if (
      !images ||
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !stock ||
      !discountPercentage ||
      !discountedPrice ||
      !shopId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let shop = await shopModel.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop Not found please create a shop",
      });
    }
    let imageUrl = [];
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      imageUrl.push(result);
    }
    let productData = req.body;
    productData.images = imageUrl;
    productData.shop = shop;
    const product = await productModel.create(productData);
    return res.status(201).json({
      success: true,
      message: "Product Created Succesfully",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error ",
    });
  }
}
export async function handleAllProducts(req, res) {
  try {
    const shopId = req.params.id;
    const products = await productModel.find({ shopId: shopId });
    if (products.length === 0) {
      // Check if no products were found
      return res.status(404).json({
        success: false,
        message: "No Products found.",
      });
    }
    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error("Error in handleAllProducts:", error); // Log the error
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Error, Please try again later",
    });
  }
}
export async function handleDeleteProducts(req, res) {
  try {
    const id = req.params.id;
    let product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Not found",
      });
    }
    const imageUrls = product.images;
    for (const imageUrl of imageUrls) {
      await deleteImagefromCloudinary(imageUrl);
    }
    let deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "Product Not found",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Product deleted succesfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in deleting the product",
    });
  }
}
