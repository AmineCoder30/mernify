import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: {
    name: { type: String, required: true },
    id: { type: String, required: true },
  },
  recipient: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  conversationId: { type: String, required: true },
  timestamp: { type: Date, default: new Date() },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
