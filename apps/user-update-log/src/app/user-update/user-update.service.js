import { Dependencies, Injectable } from '@nestjs/common';
import { UserUpdateRepository } from './user-update.repository';
import { UserUpdateRdo } from './rdo/user-update.rdo';
import { fillObject } from '@em-test/common';
import { Payload } from '@nestjs/microservices';


@Injectable()
@Dependencies(UserUpdateRepository)
export class UserUpdateService {
  constructor(userUpdateRepository) {
    this.userUpdateRepository = userUpdateRepository;
  }

  async createNewUserUpdate(@Payload() {id}) {
    await this.userUpdateRepository.create({ userId: id, update: 'User created successfully' });

    return fillObject(UserUpdateRdo, id);
  }

  async createUserUpdate(@Payload() {user, dto}) {
    await this.userUpdateRepository.create({
        userId: user.id,
        update: `User info was updated. ${
          dto.email ? `Email changed from ${user.email} to ${dto.email}.` : ''
        } ${
          dto.name ? `Name was changed from ${user.name} to ${dto.name}.` : ''
        } ${dto.password ? `Password was changed.` : ''}`,
      });

    return fillObject(UserUpdateRdo, dto);
  }

  async findMany(query) {
    const updates = await this.userUpdateRepository.findMany({...query, id: parseInt(query.id)});

    return updates.map((update) => fillObject(UserUpdateRdo, update));
  }

}
