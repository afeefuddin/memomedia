import { createUser } from "../Controller/createUser";
import { createPost } from "../Controller/createPost";
import { getPosts, } from "../Controller/getPosts";
import express from "express";

const router = express.Router();

router.route('/').get(getPosts);
router.route('/create/post').post(createPost)
router.route('/create/user').post(createUser)

export {router};