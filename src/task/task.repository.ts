import { Injectable } from '@nestjs/common';
import { TaskModel } from 'src/model/task.model';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TaskRepository {
  async getTasks(): Promise<TaskResponseDto[]> {
    const tasks = await TaskModel.findAll({});
    return tasks.map((task) => new TaskResponseDto(task));
  }
}
