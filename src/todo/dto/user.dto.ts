import { MinLength, ValidationArguments, IsNumber } from 'class-validator';
import { lengthError } from '../../ErrorHandler/LengthErrorHandling';

export class UserDto {
  @MinLength(3, {
    message: (validation: ValidationArguments) =>
      lengthError(validation, 'min'),
  })
  name: string;

  @IsNumber()
  age: number;
}
