import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Status, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class StatusService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.StatusCreateInput): Promise<Status> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.status.create({
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
        cursor?: Prisma.StatusWhereUniqueInput;
        where?: Prisma.StatusWhereInput;
        orderBy?: Prisma.StatusOrderByWithRelationInput;
        }): Promise<Status[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.status.findMany({
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
        where: Prisma.StatusWhereUniqueInput;
        data: Prisma.StatusUpdateInput;
        }): Promise<Status> {
        try {
            const { where, data } = params;
            return this.prisma.status.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
