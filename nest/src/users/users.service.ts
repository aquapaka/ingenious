import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SALT_OR_ROUNDS } from '../constants/constants';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async isUsernameAlreadyExist(username: string): Promise<boolean> {
    const foundUser = await this.userModel
      .findOne({
        username: username,
      })
      .exec();

    return foundUser ? true : false;
  }

  async getUserData(_id: Types.ObjectId): Promise<any> {
    const queryArr = await this.userModel
      .aggregate([
        {
          $match: { _id: _id },
        },
        { $unset: ['password'] },
        {
          $lookup: {
            from: 'notes',
            localField: '_id',
            foreignField: '_owner',
            pipeline: [
              {
                $match: {
                  isInTrash: {
                    $not: {
                      $eq: true,
                    },
                  },
                },
              },
              {
                $lookup: {
                  from: 'tags',
                  localField: '_tags',
                  foreignField: '_id',
                  as: '_tags',
                },
              },
            ],
            as: 'allNotes',
          },
        },
        {
          $lookup: {
            from: 'directories',
            localField: '_id',
            foreignField: '_owner',
            pipeline: [
              {
                $lookup: {
                  from: 'notes',
                  localField: '_id',
                  foreignField: '_directory',
                  let: { isInTrash: '$isInTrash' },
                  pipeline: [
                    {
                      $match: {
                        isInTrash: {
                          $not: {
                            $eq: true,
                          },
                        },
                      },
                    },
                    {
                      $lookup: {
                        from: 'tags',
                        localField: '_tags',
                        foreignField: '_id',
                        as: '_tags',
                      },
                    },
                  ],
                  as: 'notes',
                },
              },
            ],
            as: 'allDirectories',
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: '_id',
            foreignField: '_owner',
            as: 'allTags',
          },
        },
        {
          $lookup: {
            from: 'notes',
            localField: '_id',
            foreignField: '_owner',
            pipeline: [
              {
                $match: {
                  isInTrash: {
                    $eq: true,
                  },
                },
              },
              {
                $lookup: {
                  from: 'tags',
                  localField: '_tags',
                  foreignField: '_id',
                  as: '_tags',
                },
              },
            ],
            as: 'inTrashNotes',
          },
        },
      ])
      .exec();

    return queryArr[0];
  }

  findUserById(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id);
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      SALT_OR_ROUNDS,
    );

    const newUser = new this.userModel({
      username: registerUserDto.username,
      password: hashedPassword,
    });

    await newUser.save();

    return this.jwtService.sign({
      _id: newUser._id,
      username: newUser.username,
    });
  }
}
