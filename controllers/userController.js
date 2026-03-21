import User from "../models/user.js"
import bcrypt from "bcrypt"

export const RegisterUser = async (req,res)=>{
    try {
        let data = req.body;

        //check already registered
        let user = await User.findOne({email: data.email});
        if(user){
            return res.status(400).json({
                message: "user already registered 🧨"
            })
        }

        data.password = await bcrypt.hash(data.password, 10);
        let newUser = new User(data);

        await newUser.save();
        console.log("user created successfully 👤");

        return res.status(201).json({
            message: "user created successfully 👤",
            newUser
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}