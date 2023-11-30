import { loginUser, userHasLiked,getUserDetails } from "../Controller/userFunctions";
import { createUser } from "../Controller/createUser";
import express from "express";

const router = express.Router();

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/posts/hasLiked').get(userHasLiked);
router.route('/users/profile/:username').get(getUserDetails);

export {router};