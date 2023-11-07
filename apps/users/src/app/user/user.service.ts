import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { UserRdo } from './rdo/user.rdo';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UPDATE_SERVICE, fillObject } from '@em-test/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(UPDATE_SERVICE) private updateClient: ClientProxy,
  ) {}

  async findUser(id: number) {
    const user = await this.userRepository.findOne(id);

    return fillObject(UserRdo, user);
  }

  async findAll() {
    const users = await this.userRepository.findAll();

    return users.map((user) => fillObject(UserRdo, user));
  }

  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(
        await new UserEntity(dto).setPassword(dto.password)
      );
      await lastValueFrom(
        this.updateClient.emit('user_created', {id: user.id}),
      );
      return fillObject(UserRdo, user);
    } catch (err) {
      throw err;
    }


  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id);
      const update = await this.userRepository.update(
        id,
        new UserEntity({
          ...user,
          ...dto,
        })
      );

      await lastValueFrom(
        this.updateClient.emit('user_updated', {user, dto})
      )

      return fillObject(UserRdo, update);
    } catch (err) {
      throw err
    }
  }
}
