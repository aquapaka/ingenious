import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerNewUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    // Check if username is already exist
    const isUsernameExist = await this.usersService.isUsernameAlreadyExist(
      registerUserDto.username,
    );
    if (isUsernameExist) throw new ConflictException('Username already taken');

    return this.usersService.createUser(registerUserDto);
  }
}
