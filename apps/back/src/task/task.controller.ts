import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task, Prisma } from '@neko-docs/prisma-clients/projects';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiOkResponse({ description: 'Task created successfully', type: Promise<Task> })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  async createTask(
    @Body() createTaskDto: Prisma.TaskCreateInput,
  ): Promise<Task> {
    try {
      return await this.taskService.create(createTaskDto);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get tasks with Prisma params' })
  @ApiOkResponse({ description: 'Tasks retrieved successfully', type: [Promise<Task>] })
  @ApiNotFoundResponse({ description: 'No tasks found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('get')
  async getTasks(
    @Body() getTasksDto: {
      skip?: number;
      take?: number;
      cursor?: Prisma.TaskWhereUniqueInput;
      where?: Prisma.TaskWhereInput;
      orderBy?: Prisma.TaskOrderByWithRelationInput;
    },
  ): Promise<Task[]> {
    try {
      return await this.taskService.get(getTasksDto);
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ description: 'Task updated successfully', type: Promise<Task> })
  @ApiNotFoundResponse({ description: 'No task found for the provided criteria' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('update')
  async updateTask(
    @Body() updateTaskDto: {
      where: Prisma.TaskWhereUniqueInput;
      data: Prisma.TaskUpdateInput;
    },
  ): Promise<Task> {
    try {
      return await this.taskService.update(updateTaskDto);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }
}