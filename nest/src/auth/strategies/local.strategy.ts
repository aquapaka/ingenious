import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const token = await this.authService.validateUser({ username, password });
    if (!token) throw new UnauthorizedException();

    // This set token to Req.user so this token can be returned from auth/login
    return token;
  }
}
