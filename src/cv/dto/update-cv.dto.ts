import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { Optional } from '@nestjs/common';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';

export class UpdateCvDto extends PartialType(CreateCvDto) {
  @Optional()
  name: string;
  @Optional()
  firstName: string;
  @Optional()
  age: number;
  @Optional()
  cin: number;
  @Optional()
  job: string;
  @Optional()
  path: string;
  @Optional()
  skills: Skill[];
  @Optional()
  user: User;
}
