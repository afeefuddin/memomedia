import { likePost } from "../Controller/PostFunction";
import { createPost } from "../Controller/createPost";
import { getPosts, } from "../Controller/getPosts";
import express from "express";

const authRouter = express.Router();

authRouter.route('/').get(getPosts);
authRouter.route('/create/post').post(createPost)
authRouter.route('/post/like').put(likePost)

export {authRouter};