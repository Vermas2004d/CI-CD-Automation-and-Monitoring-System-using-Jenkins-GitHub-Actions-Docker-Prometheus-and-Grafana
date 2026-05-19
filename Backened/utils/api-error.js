
//this is used for the api error response

class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){ 
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
 
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
            //traces where from the error occurred//
        }
    }
}


export {ApiError};


