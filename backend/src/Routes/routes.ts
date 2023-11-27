import { loginUser, userHasLiked } from "../Controller/userFunctions";
import { createUser } from "../Controller/createUser";
import express from "express";

const router = express.Router();

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/posts/hasLiked').get(userHasLiked);

export {router};