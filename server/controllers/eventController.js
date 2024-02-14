import eventModel from "../model/eventModel.js";
import shopModel from "../model/shopModel.js";
import uploadOnCloudinary, {
  deleteImagefromCloudinary,
} from "../utils/cloudinary.js";

export async function handleCreateEvent(req, res) {
  try {
    // Destructure necessary fields from req.body
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
      startDate,
      endDate,
    } = req.body;

    // Check if files are uploaded
    let images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    // Check if essential fields are present in req.body
    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !stock ||
      !discountPercentage ||
      !discountedPrice ||
      !shopId ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    // Check if shop with provided shopId exists
    let shop = await shopModel.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop Not found",
      });
    }

    // Upload images to Cloudinary and collect URLs
    let imageUrl = [];
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      imageUrl.push(result);
    }

    // Construct eventData object
    let eventData = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPercentage,
      stock,
      discountedPrice,
      shop,
      shopId,
      startDate,
      endDate,
      images: imageUrl,
    };

    // Create event using eventData
    let event = await eventModel.create(eventData);
    if (!event) {
      return res.status(400).json({
        success: false,
        message:
          "Unable to create the event at this time please try again later",
      });
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    // Log error
    console.log(error.message);

    // Return error response
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Some error happened while creating the event",
    });
  }
}
export async function handleGetShopEvents(req, res) {
  try {
    let shopId = req.params.id;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Please enter the shop event",
      });
    }

    let eventData = await eventModel.find({ shopId: shopId });

    if (!eventData) {
      return res.status(404).json({
        success: false,
        message: "No events found please create events to better reach.",
      });
    }
    return res.status(200).json({
      success: true,
      eventData: eventData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error",
    });
  }
}
export async function handleDeleteEvent(req, res) {
  try {
    const eventId = req.params.id; // Extract event ID from request parameters
    if (!eventId) {
      // Validate if event ID exists
      return res.status(401).json({
        success: false,
        message: "Please provide the eventId",
      });
    }
    // Find the event by ID
    let event = await eventModel.findById(eventId);
    let images = event.images; // Get the images associated with the event
    await Promise.all(
      images.map((imageUrl) => deleteImagefromCloudinary(imageUrl))
    );
    let deleteEvent = await eventModel.findByIdAndDelete(eventId);
    if (!deleteEvent) {
      return res.status(400).json({
        success: false,
        message: "Error in deleting the events.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Event delted successfully",
    });
  } catch (error) {
    // If error occurs during event retrieval or other operations, return internal server error response
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in deleting the event.",
    });
  }
}
export async function handleGetAllEvents(req, res) {
  try {
    const allEvents = await eventModel.find({});
    if (!allEvents) {
      return res.status(404).json({
        success: false,
        message: "No events found",
      });
    }
    return res.status(200).json({
      success: true,
      events: allEvents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}
