import {
  IsIn,
  ValidationArguments,
  IsOptional,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { isInError } from '../../ErrorHandler/IsInErrorHandling';
import { TodoStatus } from '../../models/TodoStatus.enum';

export class SearchDto {
  @IsIn([TodoStatus.actif, TodoStatus.done, TodoStatus.waiting], {
    message: (validation: ValidationArguments) => isInError(validation),
  })
  @IsOptional()
  status: TodoStatus;
  @IsOptional()
  criteria: string;
}
