import conversationModel from "../model/conversation.js";

export async function handleCreateConversation(req, res, next) {
  try {
    const { groupTitle, userId, sellerId } = req.body;
    const existingConversation = await conversationModel.findOne({
      groupTitle,
    });
    if (existingConversation) {
      const conversation = existingConversation;
      return res.status(200).json({
        success: true,
        conversation,
      });
    }
    const conversation = await conversationModel.create({
      members: [userId, sellerId],
      groupTitle: groupTitle,
    });
    res.status(201).json({
      success: true,
      message: "Message sent to the seller ",
      conversation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleGetAllSellerConversation(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the to go further",
      });
    }
    const conversations = await conversationModel
      .find({
        members: {
          $in: [id],
        },
      })
      .sort({ updatedAt: -1, createdAt: -1 });
    if (!conversations || conversations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Conversation found for the shop.",
      });
    }
    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleUpdateLastMessage(req, res) {
  try {
    const { lastMessage, lastMessageId } = req.body;
    if (!lastMessage || !lastMessageId) {
      return res.status(400).json({
        success: false,
        message: "Please provide lastMessage && lastMessageId ",
      });
    }

    const conversation = await conversationModel.findByIdAndUpdate(
      req.params.id,
      {
        lastMessage,
        lastMessageId,
      }
    );

    if (!conversation) {
      return res.status(500).json({
        success: false,
        message: "Error in updating ",
      });
    }
    res.status(200).json({
      success: true,
      message: "Last message updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleGetAllUserConversation(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide the to go further",
      });
    }
    const conversations = await conversationModel
      .find({
        members: {
          $in: [id],
        },
      })
      .sort({ updatedAt: -1, createdAt: -1 });
    if (!conversations || conversations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Conversation found for the user.",
      });
    }
    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
