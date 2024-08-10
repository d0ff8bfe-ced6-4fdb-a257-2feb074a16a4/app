import { Controller, Get, Post, Body, Patch, Param, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@neko-docs/prisma-clients/projects';
import {
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.userService.create(data);
      return user;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get()
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.UserWhereUniqueInput,
    @Query('where') where?: Prisma.UserWhereInput,
    @Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<User[]> {
    try {
      const users = await this.userService.get({ skip, take, cursor, where, orderBy });
      return users;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.userService.get({
        where: { id },
      });
      if (user.length === 0) {
        throw new NotFoundException('User not found');
      }
      return user[0];
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      const user = await this.userService.update({
        where: { id },
        data,
      });
      return user;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}