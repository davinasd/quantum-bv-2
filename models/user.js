import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type:String,
    unique: [true,'email already exists!'],
    required:[true,'email requires!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }

});
// additional check if user already there 
const User = models.User || model("User", userSchema);
export default User;