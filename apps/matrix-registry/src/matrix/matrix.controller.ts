import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Matrix,
  MatrixHistory,
  Prisma,
} from '@neko-docs/prisma-clients/matrix-device-registry';
import { v4 as uuidv4 } from 'uuid';
import {MatrixService} from "./matrix.service";

export type MatrixGetDTO = {
  skip?: number;
  take?: number;
  cursor?: Prisma.MatrixWhereUniqueInput;
  where?: Prisma.MatrixWhereInput;
  orderBy?: Prisma.MatrixOrderByWithRelationInput;
};

class MatrixGetDTOClass {
  @ApiProperty({description: 'The number of items to skip'})
  skip?: number;
  @ApiProperty({description: 'The number of items to take'})
  take?: number;
  @ApiProperty({description: 'The cursor'})
  cursor?: Prisma.MatrixWhereUniqueInput;
  @ApiProperty({description: 'The where'})
  where?: Prisma.MatrixWhereInput;
  @ApiProperty({description: 'The orderBy'})
  orderBy?: Prisma.MatrixOrderByWithRelationInput;
}

export type MatrixCreateDTO = {
  sendedInDate: string;
  creatorUUID: string;
  name: string;
  type: string;
  status: string;
};

class MatrixCreateDTOClass {
  @ApiProperty({description: 'The date when the was sent'})
  sendedInDate: string;
  @ApiProperty({description: 'The creator UUID'})
  creatorUUID: string;
  @ApiProperty({description: 'The name of the matrix'})
  name: string;
  @ApiProperty({description: 'The type of the matrix'})
  type: string;
  @ApiProperty({description: 'The status of the matrix'})
  status: string;
}

type MatrixUpdateDTO = {
  where: Prisma.MatrixWhereUniqueInput;
  data: Prisma.MatrixUpdateInput;
};

class MatrixUpdateDTOClass {
  @ApiProperty({description: 'The where'})
  where: Prisma.MatrixWhereUniqueInput;
  @ApiProperty({description: 'The data'})
  data: Prisma.MatrixUpdateInput;
}

const apiFingerprint = 'matrix';

@ApiTags('Matrix')
@Controller('matrix')
export class MatrixController {
  constructor(private readonly matrixService: MatrixService) {}

  @ApiOperation({
    summary: 'Get ' + apiFingerprint + ' with Prisma params',
  })
  @ApiResponse({ status: 200, type: MatrixGetDTOClass })
  @ApiOkResponse({
    description: 'Retrieved ' + apiFingerprint + ' successfully',
    type: MatrixGetDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No ' + apiFingerprint + ' found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('get-with-params')
  async getMatrix(
    @Body() params: MatrixGetDTO,
  ): Promise<Matrix[]> {
    console.log('geting request');

    const { skip, take, cursor, where, orderBy } = params;

    const updatedWhere: Prisma.MatrixWhereInput = {
      ...where,
      isDeleted: false,
    };

    const res = this.matrixService.get({
      skip,
      take,
      cursor,
      where: updatedWhere,
      orderBy,
    });
    return res;
  }

  @ApiOperation({ summary: 'Create ' + apiFingerprint })
  @ApiResponse({ status: 200, type: MatrixCreateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved to create a new ' + apiFingerprint + ' successfully',
    type: MatrixCreateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'The ' + apiFingerprint + ' is not created successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('create')
  async createMatrix(
    @Body() sectionData: MatrixCreateDTO,
  ): Promise<Matrix> {
    const { name, creatorUUID, type, status, sendedInDate } = sectionData;

    console.log("data: " + JSON.stringify(sectionData));

    const { uuid } = uuidv4();

    return this.matrixService.create({
      uuid,
      name,
      creatorUUID,
      type,
      status,
      sendedInDate
    });
  }

  @ApiOperation({ summary: 'Update ' + apiFingerprint })
  @ApiResponse({ status: 200, type: MatrixUpdateDTOClass })
  @ApiOkResponse({
    description: 'Retrieved ' + apiFingerprint + ' successfully',
    type: MatrixUpdateDTOClass,
  })
  @ApiNotFoundResponse({
    description: 'No ' + apiFingerprint + ' found for this request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('update')
  async updateTask(
    @Body() params: MatrixUpdateDTO,
  ): Promise<Matrix> {
    const { data, where } = params;

    return this.matrixService.update({
      where,
      data,
    });
  }
}
