import {
  BadRequestException,
  Body,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './classes/Todo';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { AddItemDto } from './dto';
import { TodoStatus } from './classes/TodoStatus.enum';
import { updateItemDto } from './dto/updateItem.dto';

@Injectable()
export class TodoService {
  @Inject('UUID') uuid: () => string;
  private todos = [];
  getItems() {
    return this.todos;
  }
  getTodoById(payload): Todo[] {
    const { id } = payload;
    const index = this.todos.findIndex((item) => (item.id = id));
    if (index < 0) {
      throw new BadRequestException();
    }
    return this.todos.filter((item) => item.id === id);
  }
  AddItem(newTodo: AddItemDto): Todo {
    const { name, description } = newTodo;
    const todo = {
      id: this.uuid(),
      name,
      description,
      createdAt: Date.now(),
      status: TodoStatus.waiting,
    };
    this.todos.push(todo);
    return todo;
  }
  deleteItem(payload) {
    const { id } = payload;
    const index = this.todos.findIndex((item) => (item.id = id));
    if (index < 0) {
      throw new BadRequestException();
    }
    return {
      todos: this.todos.splice(
        this.todos.findIndex((item) => (item.id = id)),
        1,
      ),
      message: 'deleted successfully',
      count: 1,
    };
  }
  updateItem(payload, modifiedTodo: updateItemDto) {
    const [todo] = this.getTodoById(payload);
    const index = this.todos.findIndex((item) => (item.id = todo.id));
    if (index < 0) {
      throw new BadRequestException();
    }
    const updateTodo = { ...todo, ...modifiedTodo };
    console.log(updateTodo);
    return { updateTodo, message: 'edited successfully' };
  }
}
