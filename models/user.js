import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname :{
        type: String,
        required: true
    },
    lname :{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user", "god"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "female"
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true
    },
    password : {
        type : String,
        required : true,
    },
});

const User = mongoose.model("User", userSchema);
export default User;