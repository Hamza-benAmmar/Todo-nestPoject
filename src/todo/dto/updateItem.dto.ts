import { TodoStatus } from '../classes/TodoStatus.enum';

export class updateItemDto {
  name: string;
  description: string;
  status: TodoStatus;
}
