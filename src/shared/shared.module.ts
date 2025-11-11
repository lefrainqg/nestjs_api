import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpsCustomService } from '@sharedServices/https.service';
import { ExceptionManagerService } from '@sharedServices/exception-manager.service';

@Module({

   imports: [
      HttpModule,
   ],

   providers: [
      ExceptionManagerService,
      HttpsCustomService
   ],

   exports: [
      ExceptionManagerService,
      HttpsCustomService
   ]

})
export class SharedModule { }
