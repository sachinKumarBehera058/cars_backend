const mongoose= require("mongoose");

const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_URL);
        console.log("connection to database successful and database name:",connect.connection.name);
    }catch(err){
        console.log("cannot connect to database");
        process.exit(1);
    }
} 

module.exports=connectDB;