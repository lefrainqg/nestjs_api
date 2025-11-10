import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as source from './index';

@Module({
   imports: [
      source.SharedModule,

      TypeOrmModule.forFeature([
         source.Rol,
         source.PersonaRol
      ]),
   ],

   providers: [
      source.RolService,
      source.PersonaRolService
   ],

   controllers: [
      source.RolController,
      source.PersonaRolController
   ]
})
export class SeguridadModule { }
