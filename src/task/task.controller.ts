import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: TaskResponseDto, isArray: true })
  @Get()
  getTasks(): Promise<TaskResponseDto[]> {
    return this.taskService.getTasks();
  }
}
