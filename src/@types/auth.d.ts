export interface CreateUserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  email?: string;
  password?: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UserDbData {
  id: number;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface UserPublicData {
  id: number;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
