import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    participants: [
      {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        profilePic: { type: String, required: true },
      },
    ],
    lastMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
