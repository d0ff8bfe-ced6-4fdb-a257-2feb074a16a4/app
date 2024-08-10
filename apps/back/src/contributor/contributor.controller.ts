import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ContributorService } from './contributor.service';
import { Contributor, Prisma } from '@neko-docs/prisma-clients/projects';

@ApiTags('Contributor')
@Controller('contributor')
export class ContributorController {
  constructor(private readonly contributorService: ContributorService) {}

  @ApiOperation({ summary: 'Create a new contributor' })
  @ApiOkResponse({ description: 'Contributor created successfully', type: Promise<Contributor> })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('create')
  async createContributor(
    @Body() createContributorDto: Prisma.ContributorCreateInput,
  ): Promise<Contributor> {
    try {
      return await this.contributorService.create(createContributorDto);
    } catch (error) {
      console.error('Error creating contributor:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get contributors with Prisma params' })
  @ApiOkResponse({ description: 'Contributors retrieved successfully', type: [Promise<Contributor>] })
  @ApiNotFoundResponse({ description: 'No contributors found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('get')
  async getContributors(
    @Body() getContributorsDto: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ContributorWhereUniqueInput;
      where?: Prisma.ContributorWhereInput;
      orderBy?: Prisma.ContributorOrderByWithRelationInput;
    },
  ): Promise<Contributor[]> {
    try {
      return await this.contributorService.get(getContributorsDto);
    } catch (error) {
      console.error('Error retrieving contributors:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a contributor' })
  @ApiOkResponse({ description: 'Contributor updated successfully', type: Promise<Contributor> })
  @ApiNotFoundResponse({ description: 'No contributor found for the provided criteria' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('update')
  async updateContributor(
    @Body() updateContributorDto: {
      where: Prisma.ContributorWhereUniqueInput;
      data: Prisma.ContributorUpdateInput;
    },
  ): Promise<Contributor> {
    try {
      return await this.contributorService.update(updateContributorDto);
    } catch (error) {
      console.error('Error updating contributor:', error);
      throw error;
    }
  }
}