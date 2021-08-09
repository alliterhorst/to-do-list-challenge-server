import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatusEnum } from 'src/common/task-status.enum';

export class TaskUpdateBodyDto {
  @IsEnum(TaskStatusEnum)
  @ApiProperty({
    description: 'Novo status da tarefa',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.DONE,
  })
  status: TaskStatusEnum;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Senha do supervisor',
    example: 'TESTE',
    required: false,
  })
  supervisorPassword?: string;
}
