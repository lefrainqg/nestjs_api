import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class ExceptionManagerService {

   private logger = new Logger("Api");

   constructor() { }

   handleDBExceptions(className: string, error: any): never {
      this.logger = new Logger(className)
      if (error.code === '23505') throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException(error && error.message ? error.message : 'Unexpected error, check server logs');
   }

   handleNotFoundException(entityName: string, id: any): never {
      throw new NotFoundException(`${entityName} with id: ${id}, not found`);
   }

   handleForbiddenException(className: string, api?: string): never {
      const logMessage: string = "La api " + api ? (api + " no está disponible") : "no está disponible";
      this.logger = new Logger(className)
      this.logger.error(logMessage);
      throw new ForbiddenException(logMessage);
   }

   handleNotAcceptableException(msg: string) {
      throw new NotAcceptableException(msg);
   }

   writeLog(className: string, msg: string, type?: ExceptionType) {
      this.logger = new Logger(className)
      if (!type) {
         this.logger.log(msg);
         return;
      }
      switch (type) {
         case "FATAL":
            this.logger.fatal(msg);
            break;
         case "ERROR":
            this.logger.error(msg);
            break;
         case "DEBUG":
            this.logger.debug(msg);
            break;
         case "VERBOSE":
            this.logger.verbose(msg);
            break;
         case "WARN":
            this.logger.warn(msg);
            break;
         case "INFO":
            this.logger.log(msg);
            break;
         default:
            this.logger.log(msg);
            break;
      }
   }

}

type ExceptionType = 'FATAL' | 'ERROR' | 'DEBUG' | 'VERBOSE' | 'WARN' | 'INFO';
