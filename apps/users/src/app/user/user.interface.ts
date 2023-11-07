import { User } from '@prisma/client';

export interface IUser extends Partial<User> {
  password?: string;
}
