import { Module } from '@nestjs/common';
import { ContributorService } from './contributor.service';
import { ContributorController } from './contributor.controller';

@Module({
  providers: [ContributorService],
  controllers: [ContributorController]
})
export class ContributorModule {}
