export type UserUpdate = Partial<Omit<User, 'id'>> & {
  password?: string
};

export interface User {
  id: number;
  email: string;
  name: string;
  avatarURL: string;
  phone?: string;
};
