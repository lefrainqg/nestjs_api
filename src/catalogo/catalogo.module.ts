import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as source from './index';

@Module({
   imports: [
      source.SharedModule,

      TypeOrmModule.forFeature([
         source.Periodo
      ]),
   ],

   providers: [
      source.PeriodoService
   ],

   controllers: [
      source.PeriodoController
   ]
})
export class CatalogoModule { }
