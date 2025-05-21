/* eslint-disable prettier/prettier */
export class CreateCourseDto {
    
    title: string;
    description: string;
    category: string;
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
    available: true;
  }

  // Might have to handle Assertions later ~Yossef