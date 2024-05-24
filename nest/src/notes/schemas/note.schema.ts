import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop([String])
  tags: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  markdown: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
