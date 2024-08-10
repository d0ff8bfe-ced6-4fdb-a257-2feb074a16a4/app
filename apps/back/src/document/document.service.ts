import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { Document, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class DocumentService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.DocumentCreateInput): Promise<Document> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.document.create({
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
        cursor?: Prisma.DocumentWhereUniqueInput;
        where?: Prisma.DocumentWhereInput;
        orderBy?: Prisma.DocumentOrderByWithRelationInput;
        }): Promise<Document[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.document.findMany({
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
        where: Prisma.DocumentWhereUniqueInput;
        data: Prisma.DocumentUpdateInput;
        }): Promise<Document> {
        try {
            const { where, data } = params;
            return this.prisma.document.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
