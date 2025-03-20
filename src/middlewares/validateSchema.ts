import { RequestHandler } from 'express';
import { CreateUserData, LoginUserData } from '../@types/auth';
import { loginSchema, registerSchema } from '../validations/auth.validation';

export const validateLoginSchema: RequestHandler<
  object,
  object,
  LoginUserData
> = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ error: 'Invalid input', details: result.error.format() });
    return;
  }
  return next();
};

export const validateRegisterSchema: RequestHandler<
  object,
  object,
  CreateUserData
> = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ error: 'Invalid input', details: result.error.format() });
    return;
  }
  return next();
};
