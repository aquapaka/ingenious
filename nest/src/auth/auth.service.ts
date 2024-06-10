import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AuthPayloadDto } from './dto/auth.dto';

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

  findUserById(_id: string) {
    return this.userModel.findById(_id);
  }

  async registerNewUser({ username, password }: AuthPayloadDto) {
    // Check if username is already exist
    const foundUser = await this.userModel.findOne({
      username: username,
    });
    if (foundUser) throw new ConflictException();

    // Create new user
    const newUser = new this.userModel({
      username,
      password,
    });
    await newUser.save();

    return this.jwtService.sign({
      _id: newUser._id,
      username: newUser.username,
    });
  }
}
