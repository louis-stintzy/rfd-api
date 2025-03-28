import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    // todo: créer une ConfigurationError
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const DATABASE_URL = getEnv('DATABASE_URL');
