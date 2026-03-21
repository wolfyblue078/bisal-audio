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

export const getUser = async(req,res)=>{

    try{
        //Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let users = await User.find()
        .select("-password")  // remove password field
        .skip(skip)
        .limit(limit);

        console.log("Users retrieved succesfully 👥");

        return res.status(200).json({
            message: "Users retrieved successfully 👥",
            page,
            count: users.length,
            users
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}