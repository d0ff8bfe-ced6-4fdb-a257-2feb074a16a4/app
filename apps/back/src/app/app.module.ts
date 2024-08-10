import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from '../project/project.module';
import { ContributorModule } from '../contributor/contributor.module';
import { StatusModule } from '../status/status.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ProjectModule, ContributorModule, StatusModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
