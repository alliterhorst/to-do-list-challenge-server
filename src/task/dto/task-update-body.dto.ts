import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { TaskStatusEnum } from 'src/common/task-status.enum';

export class TaskUpdateBodyDto {
  @IsEnum(TaskStatusEnum)
  @ApiProperty({
    description: 'Novo status da tarefa',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.DONE,
  })
  status: TaskStatusEnum;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Senha do supervisor',
    example: 'TESTE',
  })
  supervisorPassword: string;
}
