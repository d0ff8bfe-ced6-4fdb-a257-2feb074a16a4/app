import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project, Prisma, Status } from '@neko-docs/prisma-clients/projects';
import { ProjectService } from './project.service';

enum ProjectTypeEnum {
    INPROGRESS
  }
  
  enum TaskTypeEnum {
    ACTION
  }
  
  enum TaskPriorityEnum {
    HIGH
  }

export type ProjectGetDTO = {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
};

class ProjectGetDTOClass {
    @ApiProperty({ description: 'The number of items to skip' })
    skip?: number;

    @ApiProperty({ description: 'The number of items to take' })
    take?: number;

    @ApiProperty({ description: 'The cursor' })
    cursor?: Prisma.ProjectWhereUniqueInput;

    @ApiProperty({ description: 'The where clause' })
    where?: Prisma.ProjectWhereInput;

    @ApiProperty({ description: 'The order by clause' })
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
}

class ProjectCreateDTOClass {
    @ApiProperty({ description: 'The date of project creation' })
    date: Date;

    @ApiProperty({ description: 'The type of the project' })
    type: ProjectTypeEnum;

    @ApiProperty({ description: 'The title of the project' })
    title: string;

    @ApiProperty({ description: 'The status of the project', required: false })
    status?: Status;

    @ApiProperty({ description: 'The description of the project' })
    description: string;

    @ApiProperty({ description: 'The IDs of contributors' })
    contributors: string[];

    @ApiProperty({ description: 'The IDs of associated tasks' })
    tasks: string[];
}

class ProjectUpdateDTOClass {
    @ApiProperty({description: 'The where'})
    where: Prisma.ProjectWhereUniqueInput;
    @ApiProperty({description: 'The data'})
    data: Prisma.ProjectUpdateInput;
}

const apiFingerprint = 'project';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
      
    @ApiOperation({
        summary: 'Get ' + apiFingerprint + ' with Prisma params',
    })
    @ApiResponse({ status: 200, type: ProjectGetDTOClass })
    @ApiOkResponse({
        description: 'Retrieved ' + apiFingerprint + ' successfully',
        type: ProjectGetDTOClass,
    })
    @ApiNotFoundResponse({
        description: 'No ' + apiFingerprint + ' found for this request',
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
    })
    @Post('get-with-params')
    async getMatrix(
        @Body() params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ProjectWhereUniqueInput;
            where?: Prisma.ProjectWhereInput;
            orderBy?: Prisma.ProjectOrderByWithRelationInput;
            },
    ): Promise<Project[]> {
        console.log('geting request');
    
        const { skip, take, cursor, where, orderBy } = params;
    
        const updatedWhere: Prisma.ProjectWhereInput = {
            ...where,
        };
    
        const res = this.projectService.get({
        skip,
        take,
        cursor,
        where: updatedWhere,
        orderBy,
        });
        return res;
    }
    
    @ApiOperation({ summary: 'Create ' + apiFingerprint })
    @ApiResponse({ status: 200, type: ProjectCreateDTOClass })
    @ApiOkResponse({
        description: 'Retrieved to create a new ' + apiFingerprint + ' successfully',
        type: ProjectCreateDTOClass,
    })
    @ApiNotFoundResponse({
        description: 'The ' + apiFingerprint + ' is not created successfully',
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
    })
    @Post('create')
    async createMatrix(
        @Body() sectionData: Prisma.ProjectCreateInput,
    ): Promise<Project> {

        console.log("data: " + JSON.stringify(sectionData));

        sectionData = {
            ...sectionData,
            date: new Date(),
        }
    
        return this.projectService.create(sectionData);
    }
    
    @ApiOperation({ summary: 'Update ' + apiFingerprint })
    @ApiResponse({ status: 200, type: ProjectUpdateDTOClass })
    @ApiOkResponse({
        description: 'Retrieved ' + apiFingerprint + ' successfully',
        type: ProjectUpdateDTOClass,
    })
    @ApiNotFoundResponse({
        description: 'No ' + apiFingerprint + ' found for this request',
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error',
    })
    @Post('update')
    async updateTask(
        @Body() params: {
            where: Prisma.ProjectWhereUniqueInput;
            data: Prisma.ProjectUpdateInput;
            },
    ): Promise<Project> {
        const { data, where } = params;
    
        return this.projectService.update({
        where,
        data,
        });
    }
}
