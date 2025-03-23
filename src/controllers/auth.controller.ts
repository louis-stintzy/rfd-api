import { RequestHandler } from 'express';
import * as authService from '../services/auth.service';
import { CreateUserData, LoginUserData, UserPublicData } from '../@types/auth';

export const verify: RequestHandler<unknown, UserPublicData, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      // todo: créer une UnauthorizedError
      throw new Error('Unauthorized');
    }
    const user = await authService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler<
  unknown,
  UserPublicData,
  CreateUserData
> = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await authService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  UserPublicData,
  LoginUserData
> = async (req, res, next) => {
  try {
    const userData = req.body;
    const { user, token } = await authService.authenticateUser(userData);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400000, // 24h en millisecondes
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    const { token } = req.cookies as { token: string };
    if (token) console.log('Todo: Blacklist token');
    res.clearCookie('token');
    res.status(200).send('Logged out');
  } catch (error) {
    next(error);
  }
};
