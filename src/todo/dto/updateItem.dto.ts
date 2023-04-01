import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, ValidationArguments } from 'class-validator';
import { TodoStatus } from '../../models/TodoStatus.enum';
import { isInError } from '../../ErrorHandler/IsInErrorHandling';
import { AddItemDto } from './addItem.dto';

export class updateItemDto extends PartialType(AddItemDto) {
  @IsIn([TodoStatus.actif, TodoStatus.done, TodoStatus.waiting], {
    message: (validation: ValidationArguments) => isInError(validation),
  })
  @IsOptional()
  status: TodoStatus;
}
