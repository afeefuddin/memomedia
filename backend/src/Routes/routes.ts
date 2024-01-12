import express from "express";
import { loginUser, userHasLiked,getUserDetails, updateProfile, searchUser } from "../Controller/userFunctions";
import { createUser, sendOTP } from "../Controller/createUser";
import { getPostfromId } from "../Controller/getPosts";
import { getAllComment, getComment } from "../Controller/CommentFunctions";
import { isUser } from "../Middleware/auth";
import { upload } from "../Middleware/Multer";


const router = express.Router();

router.route('/login').post(loginUser)
router.route('/signup').post(createUser)
router.route('/signup/sendOTP').post(sendOTP)
router.route('/posts/hasLiked').get(userHasLiked);
router.route('/users/profile/:username').get(getUserDetails);
router.route('/posts/comment').post(getAllComment)
router.route('/post/:postId').get(getPostfromId)
router.route('/comment').get(getComment)
router.route('/user/update').post(isUser,upload.single('picture'),updateProfile)
router.route('/search/:query').get(searchUser)

export {router};