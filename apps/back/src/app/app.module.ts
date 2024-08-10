import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from '../project/project.module';
import { ContributorModule } from '../contributor/contributor.module';
import { StatusModule } from '../status/status.module';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { DocumentModule } from '../document/document.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ProjectModule, ContributorModule, StatusModule, TaskModule, UserModule, TagModule, DocumentModule,
    MulterModule.register({
      dest: './uploads', // путь сохранения файла
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
