import {
  Controller,
  Dependencies,
  Get,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUpdateService } from './user-update.service';
import { UserUpdateQueryDto } from './dto/user-update-query.dto';
import { UserUpdateRdo } from './rdo/user-update.rdo';
import { Prefix } from '@em-test/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { RmqService } from '@em-test/rabbitmq';

@Controller(Prefix.Updates)
@Dependencies(UserUpdateService, RmqService)
@ApiTags(Prefix.Updates)
export class UserUpdateController {
  constructor(userUpdateService, rmqService) {
    this.userUpdateService = userUpdateService;
    this.rmqService = rmqService;
  }

  @Get()
  @ApiQuery({ name: 'Update log query', type: UserUpdateQueryDto })
  @ApiOperation({ summary: 'Get update log' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update log loaded successfully',
    type: UserUpdateRdo,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findByUserId(@Query() query) {
    return this.userUpdateService.findMany(query);
  }

  @EventPattern('user_created')
  async handleUserCreated(@Payload() data, @Ctx() context) {
    this.userUpdateService.createNewUserUpdate(data);
    this.rmqService.ack(context);
  }

  @EventPattern('user_updated')
  async handleUserUpdated(@Payload() data, @Ctx() context) {
    this.userUpdateService.createUserUpdate(data);
    this.rmqService.ack(context);
  }
}
