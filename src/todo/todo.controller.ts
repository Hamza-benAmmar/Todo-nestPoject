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
  Req,
  Version,
} from '@nestjs/common';
import { FreezerPipe } from '../pipes/freezer.pipe';
import { FusionPipe } from '../pipes/fusion.pipe';
import { Todo } from '../models/Todo';
import { AddItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';
import { TodoService } from './todo.service';
import { SearchDto } from './dto/search.dto';
import { version } from 'os';

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
  @Get(':id')
  @Version('1')
  getItemById(@Param() payload): Todo[] {
    return this.todoService.getItemById(payload);
  }
  @Get(':id')
  @Version('2')
  async getTodoById(@Param() payload) {
    const { id } = payload;
    return await this.todoService.getTodoById(id);
  }
  @Get()
  @Version('1')
  getItems(): Todo[] {
    return this.todoService.getItems();
  }
  @Get()
  @Version('2')
  getTodos() {
    return this.todoService.getTodos();
  }
  @Post('add')
  @Version('1')
  AddItem(@Body(FreezerPipe) newTodo: AddItemDto): Todo {
    return this.todoService.AddItem(newTodo);
  }
  @Post('add')
  @Version('2')
  async AddTodo(@Body() newTodo: AddItemDto, @Req() req: Request) {
    const userId = req['userId'];
    console.log(req);
    console.log(userId);
    return await this.todoService.addTodo(newTodo, userId);
  }

  @Delete('deleteTodo/:id')
  deleteItem(@Param() payload) {
    return this.todoService.deleteItem(payload);
  }
  @Delete(':id')
  async deleteTodo(@Param() payload, @Req() req: Request) {
    const { id } = payload;
    const userId = req['userId'];
    return await this.todoService.deleteTodo(id, userId);
  }
  @Delete('/soft/:id')
  async softDeleteTodo(@Param() payload, @Req() req: Request) {
    const userId = req['userId'];
    const { id } = payload;
    return await this.todoService.softdeleteTodo(id, userId);
  }

  @Patch(':id')
  async UpdateTodo(
    @Param() payload,
    @Body() updatedTodo: updateItemDto,
    @Req() req: Request,
  ) {
    const { id } = payload;
    const userId = req['userId'];
    return await this.todoService.updateTodo(id, updatedTodo, userId);
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
