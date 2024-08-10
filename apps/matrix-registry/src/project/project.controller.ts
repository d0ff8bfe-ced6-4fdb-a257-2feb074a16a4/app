import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project, Participant, Prisma } from '@neko-docs/prisma-clients/projects';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Создание нового проекта
  @Post()
  async createProject(@Body() data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectService.createProject(data);
  }

  // Получение списка проектов
  @Get()
  async getProjects(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.ProjectWhereUniqueInput,
    @Query('where') where?: Prisma.ProjectWhereInput,
    @Query('orderBy') orderBy?: Prisma.ProjectOrderByWithRelationInput,
  ): Promise<Project[]> {
    return this.projectService.get({ skip, take, cursor, where, orderBy });
  }

  // Обновление проекта по ID
  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() data: Prisma.ProjectUpdateInput,
  ): Promise<Project> {
    return this.projectService.updateProject(id, data);
  }

  // Удаление проекта по ID
  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<Project> {
    return this.projectService.deleteProject(id);
  }

  // Добавление участника к проекту
  @Post(':projectId/participants')
  async addParticipant(
    @Param('projectId') projectId: number,
    @Body() participantData: Prisma.ParticipantCreateInput,
  ): Promise<void> { // Предположим, что метод не возвращает значений, кроме успешного статуса.
    await this.projectService.addParticipant(projectId, participantData);
  }

  // Удаление участника по ID
  @Delete('participants/:id')
  async removeParticipant(@Param('id') id: number) {
    await this.projectService.removeParticipant(id);
  }
}