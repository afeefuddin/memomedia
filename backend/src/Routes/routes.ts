import { loginUser } from "../Controller/userFunctions";
import { createUser } from "../Controller/createUser";
import express from "express";

const router = express.Router();

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)

export {router};