import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Directory } from 'src/directories/schemas/directory.schema';
import { Tag } from 'src/tags/schemas/tag.schema';

@Schema()
export class Note {
  @Prop()
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  content: string;

  @Prop()
  isTrash: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Directory' })
  directory: Directory | null;
}

export type NoteDocument = HydratedDocument<Note>;

export const NoteSchema = SchemaFactory.createForClass(Note);
