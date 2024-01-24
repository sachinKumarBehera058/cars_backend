require("dotenv").config();
const connectDB=require("./db/connect");
const Product= require("./models/product");

const ProductJson =require("./products.json");

const start=async()=>{
    try {
        console.log("ProductJson:", ProductJson);
        await connectDB(process.env.MONGODB.URL);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
};

start();