import {
  BadRequestException,
  Body,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from '../models/Todo';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { AddItemDto } from './dto/addItem.dto';
import { TodoStatus } from '../models/TodoStatus.enum';
import { updateItemDto } from './dto/updateItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  @Inject('UUID') uuid: () => string;
  private todos = [];
  getItems() {
    return this.todos;
  }
  getItemById(payload): Todo[] {
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
      createdAt: new Date(),
      status: TodoStatus.waiting,
    };
    //Object.freeze(todo);
    this.todos.push(todo);
    return todo;
  }
  async addTodo(newTodo: AddItemDto) {
    return await this.todoRepository.save(newTodo);
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
    const [todo] = this.getItemById(payload);
    const index = this.todos.findIndex((item) => (item.id = todo.id));
    if (index < 0) {
      throw new BadRequestException();
    }
    const updateTodo = { ...todo, ...modifiedTodo };
    return { updateTodo, message: 'edited successfully' };
  }
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
  async getTodoById(id): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new BadRequestException(`todo not found`);
    }
    return todo;
  }

  async updateTodo(id, updatedTodo) {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new BadRequestException('todo not found');
    }
    return this.todoRepository.update(id, { ...updatedTodo });
  }

  async deleteTodo(id) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new BadRequestException('todo not found');
    }
    return this.todoRepository.delete(id);
  }
  async softdeleteTodo(id) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new BadRequestException('todo not found');
    }
    return this.todoRepository.softDelete(id);
  }
  async recoverTodo(id) {
    //const todo = await this.todoRepository.findOneBy({ id });
    return await this.todoRepository.restore(id);
  }
  async numberTodosPerStatus() {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.select('todo.status,count(todo.id) as nbre').groupBy('todo.status');
    console.log(qb.getSql());
    return await qb.getRawMany();
  }
  async paginateTodos(page: number, offset: number) {
    return await this.todoRepository.find({
      skip: offset * page,
      take: offset,
    });
  }
  async getByCriteriaOR(searchDto: SearchDto) {
    const { status, criteria } = searchDto;
    const qb = this.todoRepository.createQueryBuilder('todo');
    if (status) {
      return await qb
        .where({
          status: In([TodoStatus.actif, TodoStatus.done, TodoStatus.waiting]),
        })
        .getRawMany();
    }
    if (criteria) {
      return await qb
        .where('todo.name= :criteria OR todo.description= :criteria')
        .setParameters({ criteria })
        .getRawMany();
    }
    return await this.getTodos();
  }
  async getByCriteriaAND(searchDto: SearchDto) {
    const { status, criteria } = searchDto;
    const qb = this.todoRepository.createQueryBuilder('todo');
    if (status) {
      await qb
        .where({
          status: In([TodoStatus.actif, TodoStatus.done, TodoStatus.waiting]),
        })
        .getRawMany();
    }
    if (criteria) {
      return await qb
        .where('todo.name= :criteria OR todo.description= :criteria')
        .setParameters({ criteria })
        .getRawMany();
    }
    return await this.getTodos();
  }
}
