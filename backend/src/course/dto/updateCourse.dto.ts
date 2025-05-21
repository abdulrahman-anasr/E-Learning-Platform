/* eslint-disable prettier/prettier */
export class UpdateCourseDto {
    title?: string; 
    description?: string;
    category?: string;
    difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
    created_by?: string;
  }