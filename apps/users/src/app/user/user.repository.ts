import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import { PrismaService } from 'libs/prisma/src/lib/prisma.service';
import { ICRUD } from '@em-test/common';

@Injectable()
export class UserRepository
  implements ICRUD<UserEntity, number | string, IUser>
{
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.user.findMany();
  }

  public async create(item: UserEntity): Promise<IUser> {
    return await this.prismaService.user.create({
      data: item.toObject(),
    });
  }

  public async findOne(id: number): Promise<IUser | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async update(id: number, data: UserEntity) {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
