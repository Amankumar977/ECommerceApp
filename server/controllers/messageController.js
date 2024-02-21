import messageModel from "../model/messages.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export async function handleCreateNewMessage(req, res) {
  try {
    const { conversationId, sender } = req.body;

    // Validate conversationId and sender
    if (!conversationId || !sender) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID and sender are required.",
      });
    }

    const images = req.files;
    let imagesOfChat = [];
    if (images) {
      for (let file of req.files) {
        // Handle file upload
        const uploadedImage = await uploadOnCloudinary(file.path);
        imagesOfChat.push(uploadedImage);
      }
    }

    // Create message
    let message = await messageModel.create({
      conversationId,
      sender,
      imagesOfChat: imagesOfChat.length ? imagesOfChat : undefined,
    });

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Unable to create the message. Please try again later.",
      });
    }

    // Return success response
    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
