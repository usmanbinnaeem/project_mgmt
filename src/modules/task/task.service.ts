/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) { }

  async create(createTaskDto: CreateTaskDto) {
    return await this.repository.save(createTaskDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.repository.update({ id }, updateTaskDto);
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return `This action removed task id #${id}`;
  }
}
