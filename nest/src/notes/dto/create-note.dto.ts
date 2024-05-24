export class CreateNoteDto {
  readonly icon: string;
  readonly title: string;
  readonly tags: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly markdown: string;
}
