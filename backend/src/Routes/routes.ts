import express from "express";
import { loginUser, userHasLiked,getUserDetails } from "../Controller/userFunctions";
import { createUser, sendOTP } from "../Controller/createUser";
import { getPostfromId } from "../Controller/getPosts";

const router = express.Router();

router.route('/login').post(loginUser)
router.route('/signup').post(createUser)
router.route('/signup/sendOTP').post(sendOTP)
router.route('/posts/hasLiked').get(userHasLiked);
router.route('/users/profile/:username').get(getUserDetails);
router.route('/post/:postId').get(getPostfromId)

export {router};