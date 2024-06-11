import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto): Promise<string> {
    // Check if username is valid
    const foundUser = await this.userModel.findOne({
      username: username,
    });
    if (!foundUser) return null;

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password,
    );
    if (isPasswordMatched) {
      const { _id, username } = foundUser;
      return this.jwtService.sign({ _id, username });
    }

    return null;
  }

  findUserById(_id: string) {
    return this.userModel.findById(_id);
  }
}
