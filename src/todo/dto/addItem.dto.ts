import { PickType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Todo } from '../../models/Todo';
import { IsNotEmptyError } from '../../ErrorHandler/IsNotEmptyErrorHandling';
import { lengthError } from '../../ErrorHandler/LengthErrorHandling';
import { Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class AddItemDto {
  @MinLength(3, {
    message: (validation: ValidationArguments) =>
      lengthError(validation, 'min'),
  })
  @MaxLength(10, {
    message: (validation: ValidationArguments) =>
      lengthError(validation, 'max'),
  })
  @IsNotEmpty({
    message: (validation: ValidationArguments) => IsNotEmptyError(validation),
  })
  name: string;

  @MinLength(10, {
    message: (validation: ValidationArguments) =>
      lengthError(validation, 'min'),
  })
  @IsNotEmpty({
    message: (validation: ValidationArguments) => IsNotEmptyError(validation),
  })
  description: string;
}
