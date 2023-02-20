import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { Todo } from './classes/Todo';
import { TodoStatus } from './classes/TodoStatus.enum';
import { AddItemDto } from './dto';
import { updateItemDto } from './dto/updateItem.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('getAll')
  getItems(): Todo[] {
    return this.todoService.getItems();
  }
  @Get('getTodo/:id')
  getTodoById(@Param() payload): Todo[] {
    return this.todoService.getTodoById(payload);
  }

  @Post('AddTodo')
  AddItem(@Body() newTodo: AddItemDto): Todo {
    return this.todoService.AddItem(newTodo);
  }
  @Delete('deleteTodo/:id')
  deleteItem(@Param() payload) {
    return this.todoService.deleteItem(payload);
  }
  @Put('modifyTodo/:id')
  updateItem(@Param() payload, @Body() modifiedTodo: updateItemDto) {
    return this.todoService.updateItem(payload, modifiedTodo);
  }
}
