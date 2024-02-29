import { upload } from "../Middleware/Multer";
import { likePost } from "../Controller/PostFunction";
import { createPost } from "../Controller/createPost";
import { getPostfromId, getPosts, } from "../Controller/getPosts";
import express from "express";
import { createComment } from "../Controller/CommentFunctions";
import { loadDetails } from "../Controller/General";
import { checkIfFollowing, followUser, unFollowUser } from "../Controller/userFunctions";

const authRouter = express.Router();

authRouter.route('/').get(getPosts);
authRouter.route('/create/post').post(upload.single('picture'),createPost)
authRouter.route('/post/like').put(likePost)
authRouter.route('/create/comment').post(createComment);
authRouter.route('/loadDetails/:username').get(loadDetails);
authRouter.route('/follow').post(followUser);
authRouter.route('/unFollow').post(unFollowUser)
authRouter.route('/followed').get(checkIfFollowing);

export {authRouter};