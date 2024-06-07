import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AuthPayloadDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    // Check if username is valid
    const foundUser = await this.userModel.findOne({
      username: username,
    });
    if (!foundUser) return null;

    if (password === foundUser.password) {
      const { _id, username } = foundUser;
      return this.jwtService.sign({ _id, username });
    }
  }
}
