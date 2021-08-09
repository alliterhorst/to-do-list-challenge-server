import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import { TaskStatusEnum } from 'src/common/task-status.enum';
import { TaskBodyDto } from './dto/task-body.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(): Promise<TaskResponseDto[]> {
    return this.taskRepository.getTasks();
  }

  private async validateEmail(email: string): Promise<void> {
    try {
      const facts = await axios.get<{
        email: string;
        did_you_mean: string;
        user: string;
        domain: string;
        format_valid: boolean;
        mx_found: boolean;
        smtp_check: boolean;
        catch_all: boolean;
        role: boolean;
        disposable: boolean;
        free: boolean;
        score: number;
      }>(
        `https://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_KEY}&email=${email}`,
      );
      if (!facts?.data?.mx_found || !facts?.data?.format_valid) {
        if (facts?.data?.did_you_mean)
          throw new UnprocessableEntityException({
            message: `Email inválido, tente utilizar o email "${facts?.data?.did_you_mean}"`,
            did_you_mean: facts?.data?.did_you_mean,
          });
        else throw new UnprocessableEntityException('Email inválido');
      }
    } catch (error) {
      throw new UnprocessableEntityException('Falha ao validar email');
    }
  }

  async createTask(body: TaskBodyDto): Promise<TaskResponseDto> {
    await this.validateEmail(body.userEmail);
    return this.taskRepository.createTask(body);
  }

  async updateTaskStatus({
    taskId,
    supervisorPassword,
    status,
  }: {
    taskId: string;
    supervisorPassword?: string;
    status: TaskStatusEnum;
  }): Promise<TaskResponseDto> {
    if (
      status === TaskStatusEnum.PENDING &&
      supervisorPassword !== process.env.SUPERVISOR_PASSWORD
    )
      throw new UnauthorizedException('Senha do supervisor incorreta.');
    const task = await this.taskRepository.getTaskById(taskId);
    if (!task) throw new NotFoundException('Tarefa não localizada');
    if (task.status === status)
      throw new UnprocessableEntityException('A Tarefa já está nesse status');
    if (
      status === TaskStatusEnum.PENDING &&
      task.taskHistory?.filter(
        (taskHistory) => taskHistory.status === TaskStatusEnum.PENDING,
      )?.length === 2
    )
      throw new UnprocessableEntityException(
        'A Tarefa já atingiu o limite de vezes que pode ser alterada para pendente',
      );
    return await this.taskRepository.updateTaskStatus(task, status);
  }

  private async getDogFacts(): Promise<string[]> {
    try {
      const facts = await axios.get<
        {
          _id: string;
          __v: number;
          text: string;
          updatedAt: Date;
          deleted: boolean;
          source: string;
          sentCount: number;
        }[]
      >('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3');
      facts.data.map(({ text }) => text);
    } catch (error) {
      console.error('Erro ao buscar dados dos cachorros', error);
      return [
        'Cães possuem 42 dentes',
        'Cães possuem olfato aguçado',
        'Cães possuem uma terceira pálpebra',
      ];
    }
  }

  async withoutTask(): Promise<TaskResponseDto[]> {
    const userName = 'Eu';
    const userEmail = 'eu@me.com';
    const dogFacts = await this.getDogFacts();

    return await Promise.all(
      dogFacts.map((description) =>
        this.taskRepository.createTask({
          userName,
          userEmail,
          description,
        }),
      ),
    );
  }
}
