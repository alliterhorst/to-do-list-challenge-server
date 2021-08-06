import {
  Model,
  Table,
  PrimaryKey,
  Column,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  HasMany,
} from 'sequelize-typescript';
import { TaskStatusEnum } from 'src/common/task-status.enum';
import { TaskHistoryModel } from './task-history.model';

@Table({ tableName: 'task', timestamps: true })
export class TaskModel extends Model<TaskModel> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @Column({ field: 'user_name' })
  userName: string;

  @IsEmail
  @Column({ field: 'user_email' })
  userEmail: string;

  @Column
  description: string;

  @Column
  status: TaskStatusEnum;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @HasMany(() => TaskHistoryModel)
  taskHistory?: TaskHistoryModel[];
}
