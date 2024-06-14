import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cls: ClsService,
  ) {}

  @Get('self')
  @UseGuards(JwtAuthGuard)
  async getUserData() {
    const user = this.cls.get('user');
    const userWithData = await this.usersService.getUserData(user._id);
    return userWithData;
  }

  @Post('register')
  async registerNewUser(@Body() registerUserDto: RegisterUserDto) {
    // Check if username is already exist
    const isUsernameExist = await this.usersService.isUsernameAlreadyExist(
      registerUserDto.username,
    );
    if (isUsernameExist) throw new ConflictException('Username already taken');

    return this.usersService.createUser(registerUserDto);
  }
}
