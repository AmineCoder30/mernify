import Message from "../models/messages.js";
import Conversation from "../models/conversation.js";
// Function to add a message to the database
export const addMessage = async (req, res) => {
  try {
    const { sender, recipient, content, conversationId } = req.body;
    const parsedSender = JSON.parse(sender);
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/${req.file.path}`.replace(
          /\\/g,
          "/"
        )
      : null;
    // Create a new message object
    const newMessage = new Message({
      sender: parsedSender,
      recipient,
      content,
      conversationId,
      image,
      timestamp: new Date(),
    });

    // Save the message to the database
    await newMessage.save();

    // Update the last message in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        content: newMessage.content,
        timestamp: newMessage.timestamp,
      },
    });

    // Send a success response
    res.status(200).json({ message: "Message added successfully", newMessage });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the message" });
  }
};

// Function to get messages from the database
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve messages from the database based on conversation ID
    const messages = await Message.find({ conversationId: id }).sort({
      timestamp: 1,
    });

    // Send the retrieved messages as a response
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the messages" });
  }
};

// Function to delete messages from the database based on conversation ID
export const deleteMessages = async (req, res) => {
  try {
    const { id } = req.params;

    await Message.deleteMany({ conversationId: id });

    res.status(200).json({ message: "Messages deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the messages" });
  }
};
