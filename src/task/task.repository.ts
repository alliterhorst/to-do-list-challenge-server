import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { TaskModel } from 'src/model/task.model';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskHistoryModel } from 'src/model/task-history.model';
import { TaskStatusEnum } from 'src/common/task-status.enum';

@Injectable()
export class TaskRepository {
  async getTasks(): Promise<TaskResponseDto[]> {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: TaskHistoryModel,
        },
      ],
    });
    return tasks.map((task) => new TaskResponseDto(task));
  }

  async createTask(task: {
    userName: string;
    userEmail: string;
    description: string;
  }): Promise<TaskResponseDto> {
    return new TaskResponseDto(
      await TaskModel.create({ ...task, id: uuidv4() }),
    );
  }

  async getTaskById(id: string): Promise<TaskModel> {
    return TaskModel.findOne({
      where: { id },
      include: [
        {
          model: TaskHistoryModel,
        },
      ],
    });
  }

  private createTaskHistory(
    task: TaskModel,
    status: TaskStatusEnum,
  ): Promise<void> {
    return TaskHistoryModel.create({
      id: uuidv4(),
      taskId: task.id,
      status,
    });
  }

  async updateTaskStatus(
    task: TaskModel,
    status: TaskStatusEnum,
  ): Promise<TaskResponseDto> {
    task.status = status;
    await task.save();
    await this.createTaskHistory(task, status);
    return new TaskResponseDto(await this.getTaskById(task.id));
  }
}
