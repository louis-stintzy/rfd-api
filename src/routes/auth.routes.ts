import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import {
  validateLoginSchema,
  validateRegisterSchema,
} from '../middlewares/validateSchema';

const router = Router();

router.post('/register', validateRegisterSchema, register);
router.post('/login', validateLoginSchema, login);

export default router;
