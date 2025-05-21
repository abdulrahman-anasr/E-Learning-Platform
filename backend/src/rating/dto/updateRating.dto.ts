export class UpdateRatingDto {

  rating?: number; 

  ratedEntity?: 'Module' | 'Course' | 'Instructor'; 

  ratedEntityId?: string; 

  userId?: string; 
}
