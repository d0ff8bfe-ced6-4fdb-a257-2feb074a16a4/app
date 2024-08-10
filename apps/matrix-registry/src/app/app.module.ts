import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MatrixModule} from "../matrix/matrix.module";

@Module({
  imports: [MatrixModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
