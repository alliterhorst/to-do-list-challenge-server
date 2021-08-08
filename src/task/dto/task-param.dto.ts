import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TaskParamDto {
  @IsNotEmpty()
  @IsUUID(4)
  @ApiProperty({
    description: 'Identificador da tarefa',
    example: '8d49669a-fdde-4f01-ac54-0666df270187',
  })
  taskId: string;
}
