import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Tag {
  @Prop()
  icon: string;

  @Prop()
  name: string;

  @Prop()
  color: string;
}

export type DirectoryDocument = HydratedDocument<Tag>;

export const DirectorySchema = SchemaFactory.createForClass(Tag);
