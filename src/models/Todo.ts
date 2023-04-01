import { TodoStatus } from './TodoStatus.enum';

export class Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatus;
}
