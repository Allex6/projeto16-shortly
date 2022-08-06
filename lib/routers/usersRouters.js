import { Router } from "express";
import { me, signIn, signUp } from "../controllers/usersControllers.js";
import validateAuthentication from "./middlewares/validateAuthentication.js";
import validateLoginData from "./middlewares/validateLoginData.js";
import validateUserData from "./middlewares/validateUserData.js";

const router = Router();

router.post('/sign-in', validateLoginData, signIn);
router.post('/sign-up', validateUserData, signUp);
router.get('/users/me', validateAuthentication, me);

export default router;