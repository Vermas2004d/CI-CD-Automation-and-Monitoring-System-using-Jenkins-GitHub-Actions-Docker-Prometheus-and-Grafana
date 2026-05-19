import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/userModel.js";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
} from "../utils/mail.js";
import passport from "passport";
import { access } from "fs/promises";

//function to generate the access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    console.log("User found:", user.username, user.email); // Debug log

    // const accessToken = user.generateTemporaryToken();
    const accessToken = user.generateAccessToken();
    console.log("Access token generated"); // Debug log

    const refreshToken = user.generateRefreshToken();
    console.log("Refresh token generated"); // Debug log

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Actual error:", error); // ✅ Log the real error
    throw new ApiError(500, "Error generating tokens, Please Try again");
  }
};

//function for register controller
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password,
    phone, dob, govIdType, govIdNumber, securityQuestion,
    securityAnswer
  } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const user = await User.create({
    email,
    password,
    username,
    phone,
    dob,
    govIdType,
    govIdNumber,
    securityQuestion,
    securityAnswer,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  //in this check why we take the validateBeforeSave option//
  await user.save({ validateBeforeSave: false });

  //in this , in the mailgenContent, In the second option, we have the
  //link{we are created the dynamic link that is used for email link}..
  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      // `${req.protocol}://${req.get(
      //   "host"
      // )}/api/v1/users/verify-email/${unHashedToken}`

      `${process.env.CLIENT_URL}/verify-email/${unHashedToken}` //this goes to frontend route
    ),
  });

  //this is used to neglect all the things that we not want to give to the new user
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry -securityAnswer"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered successfully and verification email has been sent your email"
      )
    );
});

//function for login controller
const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  //email based login
  if (!email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(409, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 // 30 days
      : 24 * 60 * 60 * 1000 //1day
  };

  console.log("🍪 Cookie Settings:", {
    rememberMe,
    maxAge: options.maxAge,
    days: options.maxAge / (24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + options.maxAge)
  })

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//function for the logout controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      //set attribute change the field and the value//
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true, //one everything is done give most updated or the new version of object
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

//function for getting the current user 
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

//function for the verify email
const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(400, "Email verification token is missing");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Token is invalid or expired");
  }

  //to avoid unnecessary things in the user model//
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        isEmailVerified: true,
      },
      "Email is verified"
    )
  );
});

//function for the resend email verification
//this is only done by the user is already logged in//
const resendEmailVerification = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user?._id);
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  //find the user in db by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  //if user already verified but trying to resend the email//
  if (user.isEmailVerified) {
    throw new ApiError(409, "Email is already verified");
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  //In this,  in the mailgencontent , in the second option,
  // we have the link{we are created the dynamic link that is used for email link}
  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      // `${req.protocol}://${req.get(
      //   "host"
      // )}/api/v1/auth/verify-email/${unHashedToken}`
      `${process.env.CLIENT_URL}/verify-email/${unHashedToken}`,

    ),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {},

      "Verification email has been resent to your email"
    )
  );
});

//function to get the refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is missing");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Acess token refreshed"
        )
      );
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

//function for the forgot password request
const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset email has been sent to your email"
      )
    );
});

//function to reset the forgot password
const resetForgotPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been reset successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been changed successfully"));
});

//adding the function to handle the google callback//
const googleAuthSuccess = asyncHandler(async (req, res) => {
  const user = req.user; //injected by passport after successful auth

  if (!user) {
    throw new ApiError(404, "User authentication failed");
  }
  //genearte tokens using your existing helper
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  //redirect to your react frontent with the tokens in cookies

  if (!user.phone || !user.govIdNumber) {
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect(`${process.env.CLIENT_URL}/doc`);
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .redirect(`${process.env.CLIENT_URL}/dashboard`);
});

const totalUsers = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  return res
    .status(200)
    .json(new ApiResponse(200, { totalUsers: userCount }, "Total users fetched successfully"));
});

export {
  registerUser,
  login,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  changeCurrentPassword,
  googleAuthSuccess,
  totalUsers,
};
