import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    dob: {
      type: Date,
      required: function () {
        return !this.googleId;
      },
    },
    govIdType: {
      type: String,
      enum: ["Aadhaar Card", "Driving License", "Voter ID"],
      required: function () {
        return !this.googleId;
      },
    },
    govIdNumber: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    location: {
      type: String,
    },
    language: {
      type: String,
      default: "English"
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    twoFactor: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String
    },
    securityQuestion: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    securityAnswer: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: { type: String },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

//using the prehook here to hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();

  //hash the password and save it to db
  this.password = await bcrypt.hash(this.password, 10)
  next();
})

//this is the method for the userSchema to compare password
userSchema.methods.isPasswordCorrect = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password)
}

//generating the access token and doing the jwt sign here
userSchema.methods.generateAccessToken = function () {

  console.log("=== ACCESS TOKEN DEBUG ===");
  console.log("User ID:", this._id);
  console.log("Username:", this.username);
  console.log("Email:", this.email);
  console.log("SECRET exists?:", !!process.env.ACCESS_TOKEN_SECRET);
  console.log("SECRET value:", process.env.ACCESS_TOKEN_SECRET);
  console.log("EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    }
    , process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

//creating the refresh token method here
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

//creating the temporary token for some operations like email verification and password reset
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest('hex')

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // for 20 mins
  return { unHashedToken, hashedToken, tokenExpiry }

}

//creating one User model using the userSchema
export const User = mongoose.model("User", userSchema)


