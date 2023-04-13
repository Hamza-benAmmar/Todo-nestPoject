import { TimeTracabilityEntity } from '../../../generics/timeTracability.entity';
import { TodoStatus } from '../../../models/TodoStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity extends TimeTracabilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({
    enum: TodoStatus,
    type: 'enum',
    default: TodoStatus.waiting,
  })
  status: TodoStatus;
  @Column()
  userId: string;
}
