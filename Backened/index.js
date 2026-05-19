
import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
})
import connectDB from  './db/index.js'
import { User } from './models/userModel.js';
import app from "./app.js"



const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(port, async() => {
        let count = await User.countDocuments();
        
        console.log(`Total Users: ${count}`);
       
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", error);
    process.exit(1);
  });


