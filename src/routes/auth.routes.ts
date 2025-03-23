import { Router } from 'express';
import {
  register,
  login,
  logout,
  verify,
} from '../controllers/auth.controller';
import {
  validateLoginSchema,
  validateRegisterSchema,
} from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';

const router = Router();

router.post('/verify', validateToken, verify);
router.post('/register', validateRegisterSchema, register);
router.post('/login', validateLoginSchema, login);
router.post('/logout', logout);

export default router;
