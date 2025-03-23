import * as authRepository from '../repositories/auth.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserData, LoginUserData, UserPublicData } from '../@types/auth';

export async function createUser(
  data: CreateUserData
): Promise<UserPublicData> {
  // Get the email and password from the request body
  const { email, password } = data;
  // Verify if the user already exists
  const userExist = await authRepository.findByEmail(email);
  if (userExist) {
    // todo: créer une ConflictError
    throw new Error('User already exists');
  }
  // Hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  data.password = hash;
  // Create the user
  const newUser = await authRepository.create(data);
  // Return the user without the password
  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.created_at,
    updatedAt: newUser.updated_at,
  };
}

export async function authenticateUser(
  data: LoginUserData
): Promise<{ user: UserPublicData; token: string }> {
  // Get the email and password from the request body
  const { email, password } = data;
  // Find the user by email
  const user = await authRepository.findByEmail(email);
  if (!user) {
    // todo: suppr '->User not found' : ne pas indiquer si l'utilisateur existe ou non (message générique)
    // todo: créer une UnauthorizedError
    throw new Error('User or password incorrect (temp: User not found)');
  }
  // Compare the password with the hash stored in the database
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    // todo: suppr '->Password incorrect' : ne pas indiquer si l'utilisateur existe ou non (message générique)
    // todo: créer une UnauthorizedError
    throw new Error('User or password incorrect (temp: Password incorrect)');
  }
  // Generate a jwt
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    // todo: créer une ConfigurationError
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '24h',
  });
  // Return the user without the password + token
  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
    token,
  };
}

export async function getUserById(id: number): Promise<UserPublicData> {
  // Find the user by id
  const user = await authRepository.findById(id);
  if (!user) {
    // todo: suppr '->User not found' : ne pas indiquer si l'utilisateur existe ou non (message générique)
    // todo: créer une UnauthorizedError
    throw new Error('(temp: User not found)');
  }
  // Return the user without the password
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}
