import Conversation from "../models/conversation.js"; // Assuming Conversation model is in the models folder
import mongoose from "mongoose";

// Controller to add a new conversation
export const addConversation = async (req, res) => {
  const { participants } = req.body;

  if (!participants[0] || participants[0].length < 2) {
    return res
      .status(400)
      .json({ message: "At least two participants are required." });
  }

  const userIds = participants[0].map((participant) => participant.userId);
  const sortedUserIds = userIds.sort();
  const conversationId = `${sortedUserIds[0]}-${sortedUserIds[1]}`;

  try {
    // Check if the conversation already exists using the custom ID
    const existingConversation = await Conversation.findOne({ conversationId });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create a new conversation if none is found
    const newConversation = new Conversation({
      conversationId,
      participants: participants[0],
    });

    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while creating conversation.", error });
  }
};
// export const addConversation = async (req, res) => {
//   const { participants } = req.body;

//   if (!participants[0] || participants[0].length < 2) {
//     return res
//       .status(400)
//       .json({ message: "At least two participants are required." });
//   }

//   try {
//     // Create a new conversation
//     const newConversation = new Conversation({
//       participants: participants[0],
//     });

//     const savedConversation = await newConversation.save();
//     return res.status(201).json(savedConversation);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server error while creating conversation.", error });
//   }
// };

// Controller to remove a conversation
export const removeConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Check if conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    // Delete the conversation
    await Conversation.findByIdAndDelete(conversationId);
    return res
      .status(200)
      .json({ message: "Conversation deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while deleting conversation.", error });
  }
};

// Controller to get all conversations
export const getConversationsByParticipant = async (req, res) => {
  const { participantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(participantId))
    return res.status(404).send(`No participant with id: ${participantId}`);

  try {
    const conversations = await Conversation.find({
      "participants.userId": participantId,
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
