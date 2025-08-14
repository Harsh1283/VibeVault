import express from "express";
import { RegisterUser,LoginUser,GetUserStatus,LogoutUser} from '../controller/UserController.js';
const router = express.Router();
import { verifyToken } from '../middleware/auth.middleware.js';

router.post('/register',RegisterUser)
router.post('/login',LoginUser)

router.get('/status', verifyToken, GetUserStatus);
router.post('/logout', LogoutUser);

export default router;