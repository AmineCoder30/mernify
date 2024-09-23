import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  id: { type: String },
});
var usersModel = mongoose.model("User", userSchema);
export default usersModel;
