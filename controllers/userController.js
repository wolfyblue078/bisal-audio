import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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


export const loginUser = async (req,res)=>{
    try {
        let data = req.body;
        let user = await User.findOne({email:data.email});

        //check is user exists
        if(!user){
            return res.status(403).json({
                message: "invalid email or password 🔰"
            });
        }

        let isPasswordCorrect = await bcrypt.compare(data.password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).json({
                message: "invalid email or password 🔰"
            })
        }

        //generate token
        let token = jwt.sign(
            {
                email:user.email,
                fname: user.fname,
                role: user.role,
                gender: user.gender
            }, "B_Secret_69", {expiresIn: "2h"}
        )

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            message: "User login successfully 👤✅",
            token: token,
            userResponse
        })

    } catch (error) {
        console.log(err.message);
        res.status(500).json({
            message: error.message
        })
    }
}

export const authMiddleware = async (req,res,next)=>{
    try {
        let token = req.header("Authorization");

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided 🚫"
            });
        }
        token = token.replace("Bearer ", "");
            
        jwt.verify(token, "B_Secret_69", (error, decoded)=>{
            if(error){
                return res.status(403).json({
                    message: "Unauthorized token!"
                })
            }else{
                req.user= decoded;
                next();
            }
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
}