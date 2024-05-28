export class CreateNoteDto {
  readonly icon: string;
  readonly title: string;
  readonly tags: string[];
  readonly content: string;
  readonly parentDirectoryId: string;
}
