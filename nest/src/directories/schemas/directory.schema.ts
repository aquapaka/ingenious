import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Directory {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  color: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  _owner: User;
}

export type DirectoryDocument = HydratedDocument<Directory>;

export const DirectorySchema = SchemaFactory.createForClass(Directory);
