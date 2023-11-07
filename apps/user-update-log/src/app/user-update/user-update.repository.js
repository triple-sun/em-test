import { UPDATES_PER_PAGE } from '@em-test/common';
import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/src/lib/prisma.service';

@Injectable()
@Dependencies(PrismaService)
export class UserUpdateRepository {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async create(data) {
    return await this.prismaService.userUpdate.create({
      data: {
        update: data.update,
        user: {
        connect: {
          id: data.userId
        }
      }
    }});
  }

  async findMany({ id, sortOrder, page, limit }) {
    console.log(id)
    const take =
      limit === 0
        ? undefined
        : limit > UPDATES_PER_PAGE
        ? limit
        : UPDATES_PER_PAGE;

    const idFilter = id
      ? {
          where: {
            userId: id,
          },
        }
      : {};

    const updates = await this.prismaService.userUpdate.findMany({
      ...idFilter,
      take,
      orderBy: { createdAt: sortOrder },
      skip: take && page > 1 ? take * (page - 1) : undefined,
    });

    return updates;
  }

  async findOne(id) {
    return await this.prismaService.userUpdate.findUnique({
      where: { id },
    });
  }
}
