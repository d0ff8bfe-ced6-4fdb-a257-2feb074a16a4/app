import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Contributor, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class ContributorService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.ContributorCreateInput): Promise<Contributor> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.contributor.create({
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
        cursor?: Prisma.ContributorWhereUniqueInput;
        where?: Prisma.ContributorWhereInput;
        orderBy?: Prisma.ContributorOrderByWithRelationInput;
        }): Promise<Contributor[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.contributor.findMany({
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
        where: Prisma.ContributorWhereUniqueInput;
        data: Prisma.ContributorUpdateInput;
        }): Promise<Contributor> {
        try {
            const { where, data } = params;
            return this.prisma.contributor.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
