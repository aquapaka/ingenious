import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Directory } from 'src/directories/schemas/directory.schema';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Directory' }] })
  directories: Directory[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
