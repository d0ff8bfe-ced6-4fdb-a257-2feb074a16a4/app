import { Injectable } from '@nestjs/common';
import { MatrixDeviceRegistryClient } from '@neko-docs/prisma-clients';
import { Matrix, MatrixHistory, Prisma } from '@neko-docs/prisma-clients/matrix-device-registry';


@Injectable()
export class MatrixService {
  private prisma: MatrixDeviceRegistryClient;
  constructor() {
    this.prisma = new MatrixDeviceRegistryClient()
  }


  async create(data: Prisma.MatrixCreateInput): Promise<Matrix> {
    try {
      this.prisma.$connect();
      const matrix = await this.prisma.matrix.create({
        data,
      });
      this.prisma.$disconnect();
      return matrix;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MatrixWhereUniqueInput;
    where?: Prisma.MatrixWhereInput;
    orderBy?: Prisma.MatrixOrderByWithRelationInput;
  }): Promise<Matrix[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.matrix.findMany({
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
    where: Prisma.MatrixWhereUniqueInput;
    data: Prisma.MatrixUpdateInput;
  }): Promise<Matrix> {
    try {
      const { where, data } = params;
      return this.prisma.matrix.update({
        data,
        where,
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async delete(uuid: string): Promise<Matrix> {
    try {
      return this.prisma.matrix.update({
        where: {
          uuid: uuid,
        },
        data: {
          isDeleted: true,
        },
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

}
