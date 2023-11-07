import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from './user.interface';
import { IEntity } from '@em-test/common';

export class UserEntity implements IEntity<IUser> {
  public userId?: number;
  public email: string;
  public name: string;
  public password: string;
  public passwordHash: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: IUser) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
  }
}
