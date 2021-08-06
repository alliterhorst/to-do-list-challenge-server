import { Injectable } from '@nestjs/common';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(): Promise<TaskResponseDto[]> {
    return this.taskRepository.getTasks();
  }
}
