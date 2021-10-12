const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter Valid Email Address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);
//hash the password befor saving (encrypt the password)
userSchema.pre("save", async function (next) {
  const user = this; //current document
  const password = user.password;
  const hashedPassword = await bcrypt.hash(password, 8);
  user.password = hashedPassword;
  console.log("just before save paswwird hasbeen hashed");
  next();
});
module.exports = mongoose.model("user", userSchema);
