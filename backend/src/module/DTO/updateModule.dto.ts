/* eslint-disable prettier/prettier */
export class UpdateModuleDto {
    title?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    content?: string;
    resources?: string[];
    created_at?: Date;
  }