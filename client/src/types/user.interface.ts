export type UserUpdate = Partial<Omit<User, 'id'>> & {
  password?: string
};

enum Role {
  User,
  Helper,
  Admin,
  Owner,
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
  phone?: string;
  createdAt: string;
  roles: Role[];
};
