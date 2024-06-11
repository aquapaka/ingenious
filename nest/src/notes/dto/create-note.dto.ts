import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  readonly title: string;

  readonly content: string;

  @IsMongoId()
  readonly ownerId: string;

  @IsMongoId({ each: true })
  readonly tagIds: string[];

  @IsMongoId()
  readonly directoryId: string;
}
