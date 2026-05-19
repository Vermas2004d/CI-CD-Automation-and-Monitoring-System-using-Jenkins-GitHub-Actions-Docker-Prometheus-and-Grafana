import {User} from "../models/userModel.js"
import { ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import jwt from 'jsonwebtoken';

//this is the middleware. writing the verifyJWT
//ii is just the logic, nothing else//

export const verifyJWT = asyncHandler(async (req , res , next)=> {

    // // 1. Get token from cookies or Authorization header
    // const authHeader = req.header("Authorization");
    
    // // 2. More robust extraction: This handles the space and the "Bearer" prefix safely
    // const token = req.cookies?.accessToken || (authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null);
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){ 
        throw new ApiError(401 , "Unauthorized request");
    }

    try{
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(`
            -password -refreshToken -emailVerificationToken -emailVerificationExpiry
            `);

    if(!user){
        throw new ApiError(401 , "Invalid access token");
    }
    req.user = user;//adding the additional property in req//
    //adding information of the request to the additional property
    next();
    }
    catch(err){
        throw new ApiError(401 , "Invalid access token");
    }   


})