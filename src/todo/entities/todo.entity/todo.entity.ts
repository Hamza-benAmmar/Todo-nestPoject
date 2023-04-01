import { TimeTracabilityEntity } from 'src/generics/timeTracability.entity';
import { TodoStatus } from 'src/models/TodoStatus.enum';
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
}
