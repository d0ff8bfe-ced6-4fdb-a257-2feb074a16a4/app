import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Project, Participant, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class ProjectService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

  // Создание нового проекта
  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {
        return this.prisma.project.create({
            data: {
              title: data.title,
              description: data.description,
              status: data.status,
              icons: data.icons,
              participants: {
                create: data.participants.create,
              },
            },
            include: {
              participants: true,
            },
          });
    } catch (e) {
        console.log(e.code);
        console.log(e.message);
    }
  }

  // Получение проектов
  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.project.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  // Обновление проекта по ID
  async updateProject(id: number, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        icons: data.icons,
        participants: {
          updateMany: Array.isArray(data.participants?.updateMany)
            ? data.participants.updateMany.map((participant) => ({
                where: { id: participant.where.id },
                data: {
                  name: participant.data.name,
                  avatarUrl: participant.data.avatarUrl,
                },
              }))
            : undefined,
        },
      },
      include: {
        participants: true,
      },
    });
  }

  // Удаление проекта по ID
  async deleteProject(id: number): Promise<Project> {
    try {
        return this.prisma.project.delete({
            where: { id },
          });
    } catch (e) {
        console.log(e.code);
        console.log(e.message);
    }
  }

  // Добавление участника к проекту
  async addParticipant(projectId: number, participantData: Prisma.ParticipantCreateInput) {
    return this.prisma.participant.create({
      data: {
        ...participantData,
        project: {
          connect: { id: projectId },
        },
      },
    });
  }

  // Удаление участника по ID
  async removeParticipant(id: number): Promise<Participant> {
    return this.prisma.participant.delete({
      where: { id },
    });
  }
}