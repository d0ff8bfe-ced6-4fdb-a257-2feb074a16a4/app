import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { TagService } from './tag.service'; // Импортируйте ваш сервис
import { Tag, Prisma } from '@neko-docs/prisma-clients/projects';
import {
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() data: Prisma.TagCreateInput): Promise<Tag> {
    return this.tagService.create(data);
  }

  @Get()
  async get(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.TagWhereUniqueInput,
    @Query('where') where?: Prisma.TagWhereInput,
    @Query('orderBy') orderBy?: Prisma.TagOrderByWithRelationInput,
  ): Promise<Tag[]> {
    return this.tagService.get({
      skip: Number(skip),
      take: Number(take),
      cursor,
      where,
      orderBy,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.TagUpdateInput,
  ): Promise<Tag> {
    return this.tagService.update({
      where: { id },
      data,
    });
  }
}