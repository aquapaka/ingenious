import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';

@Schema()
export class Directory {
  @Prop()
  icon: string;

  @Prop()
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Directory' }] })
  directories: this[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  notes: Note[];
}

export type DirectoryDocument = HydratedDocument<Directory>;

export const DirectorySchema = SchemaFactory.createForClass(Directory);
