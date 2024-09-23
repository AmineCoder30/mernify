import express from "express";
const router = express.Router();
import upload from "../config/multerConfig.js";

import { signin, signup, getAllUsers } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", upload.single("image"), signup);
router.get("/getall", getAllUsers);

export default router;
