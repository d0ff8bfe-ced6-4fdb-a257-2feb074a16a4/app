import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatusService } from './status.service';
import { Status, Prisma } from '@neko-docs/prisma-clients/projects';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Create a new status' })
  @ApiOkResponse({ description: 'Status created successfully', type: Promise<Status> })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  async createStatus(
    @Body() createStatusDto: Prisma.StatusCreateInput,
  ): Promise<Status> {
    try {
      return await this.statusService.create(createStatusDto);
    } catch (error) {
      console.error('Error creating status:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get statuses with Prisma params' })
  @ApiOkResponse({ description: 'Statuses retrieved successfully', type: [Promise<Status>] })
  @ApiNotFoundResponse({ description: 'No statuses found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('get')
  async getStatuses(
    @Body() getStatusesDto: {
      skip?: number;
      take?: number;
      cursor?: Prisma.StatusWhereUniqueInput;
      where?: Prisma.StatusWhereInput;
      orderBy?: Prisma.StatusOrderByWithRelationInput;
    },
  ): Promise<Status[]> {
    try {
      return await this.statusService.get(getStatusesDto);
    } catch (error) {
      console.error('Error retrieving statuses:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a status' })
  @ApiOkResponse({ description: 'Status updated successfully', type: Promise<Status> })
  @ApiNotFoundResponse({ description: 'No status found for the provided criteria' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('update')
  async updateStatus(
    @Body() updateStatusDto: {
      where: Prisma.StatusWhereUniqueInput;
      data: Prisma.StatusUpdateInput;
    },
  ): Promise<Status> {
    try {
      return await this.statusService.update(updateStatusDto);
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
}