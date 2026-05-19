import {body} from 'express-validator'


const userRegisterValidator = () => {
    return [
        body("email")//extracted all the fields by this//
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength({min: 3})
            .withMessage("Username must be at least 3 characters long"),

        body("password")
            .trim()
            .notEmpty()
            .isLength({min:8})
            .withMessage("Password is required"),

        // body("fullname")
        //     .optional()
        //     .trim()
    ];
}

const userLoginValidator = () => {
    return [
        body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
        .notEmpty()
        .withMessage("Password is required")
    ]
}

//from here writing the more validators
//then add the routes
const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
        .notEmpty()
        .withMessage("Old password is required"),

        body("newPassword")
            .notEmpty()
            .withMessage("New password is required")
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid")
    ];
} 

const userResetForgotPasswordValidator = () => {
    return  [
        body("newPassword")
            .notEmpty()
            .withMessage("Password is required")
    ]
}

export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator
}