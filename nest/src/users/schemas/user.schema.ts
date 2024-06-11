import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Directory } from '../../directories/schemas/directory.schema';

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Directory' }] })
  directories: Directory[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
