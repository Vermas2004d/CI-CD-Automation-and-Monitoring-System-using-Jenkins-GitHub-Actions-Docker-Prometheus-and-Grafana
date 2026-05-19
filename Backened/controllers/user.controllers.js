import { User } from "../models/userModel.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";



const updateProfile = asyncHandler(async (req, res) => {
    const {
        username, phone, location, language, notifications, twoFactor, avatar,
        dob, govIdType, govIdNumber, securityQuestion, securityAnswer
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    //update fields
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (language) user.language = language;
    if (notifications !== undefined) user.notifications = notifications;
    if (twoFactor !== undefined) user.twoFactor = twoFactor;
    if (avatar) user.avatar = avatar;

    // New fields for Doc.jsx flow
    if (dob) user.dob = dob;
    if (govIdType) user.govIdType = govIdType;
    if (govIdNumber) user.govIdNumber = govIdNumber;
    if (securityQuestion) user.securityQuestion = securityQuestion;
    if (securityAnswer) user.securityAnswer = securityAnswer;

    await user.save({ validateBeforeSave: false });

    // FIX: Changed 'user' to 'User' (the model)
    const updatedUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry"
    );

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});

export { updateProfile };