import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from 'src/common/task-status.enum';
import { TaskHistoryModel } from 'src/model/task-history.model';
import { TaskModel } from 'src/model/task.model';

export class TaskHistoryResponseDto {
  @ApiProperty({
    description: 'Identificador do historico da transação',
    example: '3e69669a-fdde-4f01-ac54-0666df270187',
  })
  id: string;

  @ApiProperty({
    description: 'Status da task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @ApiProperty({
    description: 'Data da criação da task',
    example: '2021-08-06T20:30:00.000Z',
  })
  createdAt: Date;

  constructor(taskHistoryModel: TaskHistoryModel) {
    this.id = taskHistoryModel.id;
    this.status = taskHistoryModel.status;
    this.createdAt = taskHistoryModel.createdAt;
  }
}

export class TaskResponseDto {
  @ApiProperty({
    description: 'Identificador da transação',
    example: '8d49669a-fdde-4f01-ac54-0666df270187',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do Responsável pela tarefa',
    example: 'Antonio Terhorst',
  })
  userName: string;

  @ApiProperty({
    description: 'Email do Responsável pela tarefa',
    example: 'antonio.terhorst@test.me',
  })
  userEmail: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Configurar VPN',
  })
  description: string;

  @ApiProperty({
    description: 'Status da task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
  })
  status: TaskStatusEnum;

  @ApiProperty({
    description: 'Data da criação da task',
    example: '2021-08-06T20:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da alteração da task',
    example: '2021-08-06T20:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Historico de alteração da task',
    type: TaskHistoryResponseDto,
    isArray: true,
    required: false,
  })
  taskHistory?: TaskHistoryResponseDto[];

  constructor(taskModel: TaskModel) {
    this.id = taskModel.id;
    this.status = taskModel.status;
    this.description = taskModel.description;
    this.userName = taskModel.userName;
    this.userEmail = taskModel.userEmail;
    this.createdAt = taskModel.createdAt;
    this.updatedAt = taskModel.updatedAt;
    if (taskModel?.taskHistory?.length)
      this.taskHistory = taskModel.taskHistory.map(
        (taskHistory) => new TaskHistoryResponseDto(taskHistory),
      );
  }
}
