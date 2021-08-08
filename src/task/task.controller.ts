import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskBodyDto } from './dto/task-body.dto';
import { TaskParamDto } from './dto/task-param.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskUpdateBodyDto } from './dto/task-update-body.dto';
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

  @ApiCreatedResponse({ type: TaskResponseDto })
  @Post()
  createTask(@Body() body: TaskBodyDto): Promise<TaskResponseDto> {
    return this.taskService.createTask(body);
  }

  @ApiOkResponse({ type: TaskResponseDto })
  @Patch(':taskId')
  updateTask(
    @Param() { taskId }: TaskParamDto,
    @Body() { status, supervisorPassword }: TaskUpdateBodyDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.updateTaskStatus({
      taskId,
      status,
      supervisorPassword,
    });
  }

  @ApiCreatedResponse({ type: TaskResponseDto, isArray: true })
  @Post('without-task')
  async withoutTask(): Promise<TaskResponseDto[]> {
    return this.taskService.withoutTask();
  }
}
