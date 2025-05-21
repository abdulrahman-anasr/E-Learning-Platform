export class CreateProgressDTO {

  user_id: string; 

  course_id: string; 
  
  completion_percentage: number; 

  last_accessed?: string; // Optional field

  attendance?: { 
    date: Date;
    status: 'present' | 'absent';
  }[];

}
