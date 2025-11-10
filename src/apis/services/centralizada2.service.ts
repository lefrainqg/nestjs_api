import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { envs } from '@config/envs';
import { HttpsCustomService } from '@sharedServices/https.service';
import { ExceptionManagerService } from '@sharedServices/exception-manager.service';

@Injectable()
export class Centralizada2Service {

   private API_CENTRALIZADA_2: string = envs.apiCentralizada2

   constructor(
      private readonly https: HttpsCustomService,
      private readonly excManager: ExceptionManagerService,
   ) { }

   async getc2PersonaById(perId: number) {
      try {
         const data = await new Promise<any>((resolve) =>
            this.https.get(`${this.API_CENTRALIZADA_2}/objetopersonalizadodadoid/${perId}`).subscribe((res) => { resolve(res.data); })
         );
         if (!data || !data.listado || data.listado.length === 0) return undefined;
         this.excManager.writeLog("Centralizada2Service", `Persona ${perId} encontrada con exito`);
         return data.listado[0];
      } catch (error) {
         this.excManager.handleDBExceptions("Centralizada2Service", error);
      }
   }

   async getc2PersonaByCedula(perCedula: string) {
      try {
         const result: any = await firstValueFrom(this.https.get(`${this.API_CENTRALIZADA_2}/objpersonalizado/${perCedula}`));
         if (!result || !result.data) return undefined;
         const { data } = result;
         if (!data.success || !data.listado || data.listado.length === 0) return undefined;
         this.excManager.writeLog("Centralizada2Service", `Persona ${perCedula} encontrada con exito`);
         return data.listado[0];
      } catch (error) {
         this.excManager.handleDBExceptions("Centralizada2Service", error);
      }
   }

}
