import { Body, Controller, Post } from '@nestjs/common';

import { Centralizada2Service } from '@apisServices/centralizada2.service';

@Controller('centralizada2')
export class Centralizada2Controller {

   constructor(private readonly centralizada2Service: Centralizada2Service) { }

   @Post('persona')
   getPersona(@Body() request: any) {
      if (!request || !request.strCedula) return undefined;
      return this.centralizada2Service.getc2PersonaByCedula(request.strCedula);
   }

}
