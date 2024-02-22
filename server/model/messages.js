import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    imagesOfChat: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
let messageModel = mongoose.model("message", messageSchema);
export default messageModel;
