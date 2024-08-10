import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Task, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class TaskService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.task.create({
            data,
            });
            this.prisma.$disconnect();
            return matrix;
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }

    async get(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TaskWhereUniqueInput;
        where?: Prisma.TaskWhereInput;
        orderBy?: Prisma.TaskOrderByWithRelationInput;
        }): Promise<Task[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.task.findMany({
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

    async update(params: {
        where: Prisma.TaskWhereUniqueInput;
        data: Prisma.TaskUpdateInput;
        }): Promise<Task> {
        try {
            const { where, data } = params;
            return this.prisma.task.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
