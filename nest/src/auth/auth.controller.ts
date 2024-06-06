import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authPayload: AuthPayloadDto) {
    const user = await this.authService.validateUser(authPayload);
    if (!user) throw new HttpException('Invlid credentials', 401);

    return user;
  }
}
