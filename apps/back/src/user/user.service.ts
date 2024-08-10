import { Injectable } from '@nestjs/common';
import { ProjectsClient } from '@neko-docs/prisma-clients';
import { User, Prisma } from '@neko-docs/prisma-clients/projects';

@Injectable()
export class UserService {
    private prisma: ProjectsClient;
    constructor() {
      this.prisma = new ProjectsClient()
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        try {
            this.prisma.$connect();
            const matrix = await this.prisma.user.create({
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
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        }): Promise<User[]> {
        try {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.user.findMany({
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
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
        }): Promise<User> {
        try {
            const { where, data } = params;
            return this.prisma.user.update({
            data,
            where,
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.message);
        }
    }
}
