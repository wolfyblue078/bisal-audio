import User from "../models/user.js"

export const RegisterUser = async (req,res)=>{
    try {
        let data = req.body;
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