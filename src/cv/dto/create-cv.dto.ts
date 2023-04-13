import { Optional } from '@nestjs/common';
import { User } from '@ngneat/falso';
import { IsNotEmpty } from 'class-validator';
import { Skill } from 'src/skill/entities/skill.entity';

export class CreateCvDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  age: number;
  @IsNotEmpty()
  cin: number;
  @IsNotEmpty()
  job: string;
  @IsNotEmpty()
  path: string;
  @IsNotEmpty()
  skills: Skill[];
  @IsNotEmpty()
  user: User;
}
