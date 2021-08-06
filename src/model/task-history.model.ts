import {
  Model,
  Table,
  PrimaryKey,
  Column,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TaskStatusEnum } from 'src/common/task-status.enum';
import { TaskModel } from './task.model';

@Table({ tableName: 'task_history', timestamps: true })
export class TaskHistoryModel extends Model<TaskHistoryModel> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @IsUUID(4)
  @ForeignKey(() => TaskModel)
  @Column({ field: 'task_id' })
  taskId: string;

  @Column
  status: TaskStatusEnum;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => TaskModel)
  task: TaskModel;
}
