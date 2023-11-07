import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().params;

    const user = await this.userRepository.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }

    return !!user;
  }
}
