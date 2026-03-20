import e from "express";
import mongoose from "mongoose";

const app = e();

let mongoUrl = "mongodb+srv://admin:123@main.mkocfh6.mongodb.net/?appName=Main"
let connection = async ()=>{
    try{
        await mongoose.connect(mongoUrl);
        console.log("DataBase connected successfuly ✅")
    }catch(err){
        console.log("DB Connection error! -"+ err.message);
    }
}
await connection();

app.listen(3000, ()=>{
    console.log("app is running on port 3000 🤖");
});