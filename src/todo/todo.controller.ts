import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FreezerPipe } from '../pipes/freezer.pipe';
import { FusionPipe } from '../pipes/fusion.pipe';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { Todo } from '../models/Todo';
import { TodoStatus } from '../models/TodoStatus.enum';
import { AddItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';
import { TodoService } from './todo.service';
import { DurationExecutionInterceptor } from 'src/interceptors/duration-execution/duration-execution.interceptor';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { SearchDto } from './dto/search.dto';

@UseInterceptors(DurationExecutionInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('searchOR')
  async getByCriteriaOR(@Query() searchDto: SearchDto) {
    return await this.todoService.getByCriteriaOR(searchDto);
  }

  @Get('searchAND')
  async getByCriteriaAND(@Query() searchDto: SearchDto) {
    return await this.todoService.getByCriteriaAND(searchDto);
  }

  @Get('pages')
  async paginateTodos(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
  ) {
    return this.todoService.paginateTodos(page, offset);
  }

  @Get('stats')
  numberTodosPerStatus() {
    return this.todoService.numberTodosPerStatus();
  }

  @Get('getAll')
  getItems(): Todo[] {
    return this.todoService.getItems();
  }
  @Get('getTodo/:id')
  getItemById(@Param() payload): Todo[] {
    return this.todoService.getItemById(payload);
  }
  @Get(':id')
  async getTodoById(@Param() payload) {
    const { id } = payload;
    return await this.todoService.getTodoById(id);
  }
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }
  @Post('AddTodo')
  AddItem(@Body(FreezerPipe) newTodo: AddItemDto): Todo {
    return this.todoService.AddItem(newTodo);
  }
  @Post()
  async AddTodo(@Body() newTodo: AddItemDto) {
    return await this.todoService.addTodo(newTodo);
  }

  @Delete('deleteTodo/:id')
  deleteItem(@Param() payload) {
    return this.todoService.deleteItem(payload);
  }
  @Delete(':id')
  async deleteTodo(@Param() payload) {
    const { id } = payload;
    return await this.todoService.deleteTodo(id);
  }
  @Delete('/soft/:id')
  async softDeleteTodo(@Param() payload) {
    const { id } = payload;
    return await this.todoService.softdeleteTodo(id);
  }

  @Patch(':id')
  async UpdateTodo(@Param() payload, @Body() updatedTodo: updateItemDto) {
    const { id } = payload;
    return await this.todoService.updateTodo(id, updatedTodo);
  }

  @Put('modifyTodo/:id')
  updateItem(@Param() payload, @Body() modifiedTodo: updateItemDto) {
    return this.todoService.updateItem(payload, modifiedTodo);
  }
  @Post('fusion')
  fusion(@Body(FusionPipe) payload) {
    return payload;
  }
  @Get('recover/:id')
  async recoverTodo(@Param() payload) {
    const { id } = payload;
    return this.todoService.recoverTodo(id);
  }
}
