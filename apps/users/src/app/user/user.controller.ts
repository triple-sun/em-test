import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prefix } from '@em-test/common';
import { EmailAlreadyExistsGuard } from './guards/email-already-exists.guard';
import { UserExistsGuard } from './guards/user-exists.guard';

@ApiTags(Prefix.Users)
@Controller(Prefix.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(EmailAlreadyExistsGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: UserRdo,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  registerUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users loaded',
    type: [UserRdo],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(UserExistsGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User id',
  })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserRdo,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
}
