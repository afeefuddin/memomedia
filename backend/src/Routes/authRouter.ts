import { upload } from "../Middleware/Multer";
import { likePost } from "../Controller/PostFunction";
import { createPost } from "../Controller/createPost";
import { getPostfromId, getPosts, } from "../Controller/getPosts";
import express from "express";
import { createComment } from "../Controller/CommentFunctions";
import { loadDetails } from "../Controller/General";

const authRouter = express.Router();

authRouter.route('/').get(getPosts);
authRouter.route('/create/post').post(upload.single('picture'),createPost)
authRouter.route('/post/like').put(likePost)
authRouter.route('/create/comment').post(createComment);
authRouter.route('/loadDetails/:username').get(loadDetails);

export {authRouter};