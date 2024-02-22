import messageModel from "../model/messages.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export async function handleCreateNewMessage(req, res) {
  try {
    const { conversationId, sender, text } = req.body;

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
      text,
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
export async function handleGetAllMessages(req, res) {
  try {
    const conversationId = req.params.id;
    console.log(conversationId);
    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the conversation id",
      });
    }
    const allMessages = await messageModel.find({ conversationId });

    if (!allMessages || allMessages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No message found",
      });
    }
    return res.status(200).json({
      success: true,
      allMessages: allMessages,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
