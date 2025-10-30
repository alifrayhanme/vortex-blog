const bcrypt = require("bcrypt");
const { Schema, model, pluralize } = require("mongoose");

pluralize(null);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: [
        30,
        "Maximum character length is name is 30. You entered more than 30 character",
      ],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email pattern mismatch, it must match following pattern: user@example.com",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    picture_url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    bio: {
      type: String,
      default: "",
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10); // Increased salt rounds for better security
        next();
    } catch (error) {
        next(error);
    }
});

const User = model("Users", userSchema, "users");

module.exports = User;
