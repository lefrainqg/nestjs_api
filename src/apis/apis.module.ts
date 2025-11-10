import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { Centralizada2Service } from './services/centralizada2.service';
import { Centralizada2Controller } from './controllers/centralizada2.controller';

@Module({

   imports: [
      SharedModule
   ],

   providers: [
      Centralizada2Service
   ],

   controllers: [
      Centralizada2Controller
   ],

   exports: [
      Centralizada2Service
   ]

})
export class ApisModule { }
