import { RequestHandler } from 'express';
import * as authService from '../services/auth.service';
import { CreateUserData, LoginUserData, UserPublicData } from '../@types/auth';

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
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      maxAge: 86400000, // 24h en millisecondes
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
