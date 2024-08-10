import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Tag, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class TagService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.TagCreateInput): Promise<Tag> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.tag.create({
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
        cursor?: Prisma.TagWhereUniqueInput;
        where?: Prisma.TagWhereInput;
        orderBy?: Prisma.TagOrderByWithRelationInput;
        }): Promise<Tag[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.tag.findMany({
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
        where: Prisma.TagWhereUniqueInput;
        data: Prisma.TagUpdateInput;
        }): Promise<Tag> {
        try {
            const { where, data } = params;
            return this.prisma.tag.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
