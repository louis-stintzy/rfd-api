import { CreateUserData, UserDbData } from '../@types/auth';
import { pool } from '../db/db_connect';

export async function findByEmail(email: string): Promise<UserDbData | null> {
  const emailQuery = 'SELECT * FROM users WHERE email = $1';
  const emailValues = [email];
  const emailResult = await pool.query(emailQuery, emailValues);
  const user = (emailResult.rows[0] as UserDbData) ?? null;
  return user;
}

export async function create(data: CreateUserData): Promise<UserDbData> {
  const insertQuery =
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
  const insertValues = [data.email, data.password];
  const insertResult = await pool.query(insertQuery, insertValues);
  const newUser = insertResult.rows[0] as UserDbData;
  return newUser;
}
