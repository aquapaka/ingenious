import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Directory } from '../../directories/schemas/directory.schema';
import { Tag } from '../../tags/schemas/tag.schema';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  _owner: User;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }] })
  _tags: Tag[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isInTrash: boolean;

  @Prop()
  isFavorite: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Directory' })
  _directory: Directory;
}

export type NoteDocument = HydratedDocument<Note>;

export const NoteSchema = SchemaFactory.createForClass(Note);
