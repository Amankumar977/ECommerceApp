import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);
let conversationModel = mongoose.model("conversation", conversationSchema);
export default conversationModel;
