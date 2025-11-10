import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

import { CreatePersonaRolDto } from './create-persona-rol.dto';

export class UpdatePersonaRolDto extends PartialType(CreatePersonaRolDto) {

   @IsBoolean()
   @IsOptional()
   prolEstado: boolean;

   @IsDateString()
   @IsOptional()
   prolFechaCreacion: Date;

}
