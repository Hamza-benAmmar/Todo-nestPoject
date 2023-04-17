import { IsNotEmpty } from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';

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
