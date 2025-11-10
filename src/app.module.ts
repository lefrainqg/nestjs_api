import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as source from './index';
import { routes } from './routes';

@Module({
   imports: [
      ConfigModule.forRoot(),

      // database
      TypeOrmModule.forRoot(source.DatabaseConfig),

      // router
      RouterModule.register(routes),

      // modules
      source.ApisModule,
      source.SharedModule,
      source.CatalogoModule,
      source.SeguridadModule,
   ]
})
export class AppModule { }
