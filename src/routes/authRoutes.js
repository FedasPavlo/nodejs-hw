import { Router } from 'express';
import { celebrate } from "celebrate";
import { loginUser, registerUser, logOutUser, refreshUserSession } from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidations.js';

const router = Router ();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/logout", logOutUser);
router.post("/auth/refresh", refreshUserSession);

export default router;
