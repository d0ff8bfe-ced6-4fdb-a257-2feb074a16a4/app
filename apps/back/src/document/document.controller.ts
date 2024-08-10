import { Controller, Post, Body, Get, Query, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document, Prisma } from '@neko-docs/prisma-clients/projects';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

// Импортируем тип для загружаемого файла
import { Express } from 'express';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // путь сохранения файла
      filename: (req, file, cb) => {
        // Генерация уникального имени файла
        const uniqueSuffix = uuidv4() + extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
  }))
  async create(
    @Body() createDocumentDto: Prisma.DocumentCreateInput,
    @UploadedFile() file: Express.Multer.File // Используем правильный тип для файла
  ): Promise<Document> {
    // Можно сохранить путь файла в базе данных, если необходимо
    console.log('Uploaded file:', file);

    // Продолжить с созданием документа
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  async get(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.DocumentWhereUniqueInput,
    @Query('where') where?: Prisma.DocumentWhereInput,
    @Query('orderBy') orderBy?: Prisma.DocumentOrderByWithRelationInput,
  ): Promise<Document[]> {
    return this.documentService.get({ skip, take, cursor, where, orderBy });
  }

  @Patch()
  async update(
    @Body('where') where: Prisma.DocumentWhereUniqueInput,
    @Body('data') data: Prisma.DocumentUpdateInput,
  ): Promise<Document> {
    return this.documentService.update({ where, data });
  }
}