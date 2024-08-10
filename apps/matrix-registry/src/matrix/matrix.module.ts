import { Module } from '@nestjs/common';
import { MatrixService } from './matrix.service';
import { MatrixController } from './matrix.controller';

@Module({
  providers: [MatrixService],
  controllers: [MatrixController],
  imports: [],
})
export class MatrixModule {}
