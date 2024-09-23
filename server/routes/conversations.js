import express from "express";
const router = express.Router();

import {
  removeConversation,
  addConversation,
  getConversationsByParticipant,
} from "../controllers/conversations.js";

router.post("/remove", removeConversation);
router.post("/create", addConversation);
router.get("/getall/:participantId", getConversationsByParticipant);

export default router;
