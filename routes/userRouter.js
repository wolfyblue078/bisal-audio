import e from "express";
import { getUser, loginUser, RegisterUser } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post("/new", RegisterUser);
userRouter.get("/users", getUser);
userRouter.post("/login", loginUser);


export default userRouter;