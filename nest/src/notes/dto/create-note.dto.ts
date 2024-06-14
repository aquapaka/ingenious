import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  readonly title: string;

  readonly content: string;

  @IsOptional()
  readonly isInTrash: boolean;

  @IsMongoId({ each: true })
  @IsOptional()
  readonly tagIds: string[];

  @IsMongoId()
  @IsOptional()
  readonly directoryId: string;
}
