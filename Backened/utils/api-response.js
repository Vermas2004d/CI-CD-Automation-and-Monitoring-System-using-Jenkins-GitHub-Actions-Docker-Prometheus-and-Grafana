
//this file is used for the standard api response

class ApiResponse {
    constructor(statusCode , data , message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse } ;
   
/*
Example:

{
  "statusCode": 404,
  "data": null,
  "message": "User not found",
  "success": false
}

*/

