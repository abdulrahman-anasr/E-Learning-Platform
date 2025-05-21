/* eslint-disable prettier/prettier */
import { IsInt, Min, Max } from 'class-validator';
export class CreateRatingDto {

  @IsInt()
  @Min(1)
  @Max(5)
    rating: number;

    ratedEntity: 'Module' | 'Instructor';

    ratedEntityId: string;

    user_id: string;
}