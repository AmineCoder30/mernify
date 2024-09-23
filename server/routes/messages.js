import express from "express";
import {
  addMessage,
  getMessages,
  deleteMessages,
} from "../controllers/messages.js";
import upload from "../config/multerConfig.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/:id", getMessages);
router.post("/", auth, upload.single("image"), addMessage);
router.delete("/deleteMessages/:id", auth, deleteMessages);

export default router;
