import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "../models/userModel.js";

//in this file we keep passport logic

passport.use( 
  new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    passReqToCallback: true,
  },
  async (req , accessToken , refreshToken, profile, done) => {
    try{
        let user = await User.findOne({email: profile.email});

        if(!user){
            //register new user via google
            user = await User.create({
                username: profile.displayName.toLowerCase().replace(/\s/g , ""),
                email: profile.email,
                googleId: profile.id,
                isEmailVerified: true, //google emails are already verified
            });
        }
        return done(null , user);
    }
    catch(error){
        return done(error , null);
    }
  }
)
);
