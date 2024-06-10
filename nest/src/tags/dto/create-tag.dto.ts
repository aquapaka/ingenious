import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly color: string;
}
