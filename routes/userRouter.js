import e from "express";
import { authMiddleware, getUser, loginUser, RegisterUser } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post("/new", RegisterUser);
userRouter.get("/users",authMiddleware, getUser);
userRouter.post("/login", loginUser);


export default userRouter;