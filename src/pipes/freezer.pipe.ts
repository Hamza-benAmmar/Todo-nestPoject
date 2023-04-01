import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TodoStatus } from 'src/models/TodoStatus.enum';

@Injectable()
export class FreezerPipe implements PipeTransform {
  transform(objet: any, metadata: ArgumentMetadata) {
    return Object.freeze(objet);
  }
}
