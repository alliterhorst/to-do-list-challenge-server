import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class TaskBodyDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do Responsável pela tarefa',
    example: 'Antonio Terhorst',
  })
  userName: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do Responsável pela tarefa',
    example: 'antonio.terhorst@test.me',
  })
  userEmail: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Configurar VPN',
  })
  description: string;
}
