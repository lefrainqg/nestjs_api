import { IsDateString, IsInt, IsPositive, IsString, MinLength } from "class-validator";

import { PersonaRol } from "@seguridadModels/persona-rol.entity";

export class CreatePeriodoDto {

   @IsString()
   @MinLength(1)
   prdNombre: string;

   @IsDateString()
   prdFechaInicio: Date;

   @IsDateString()
   prdFechaFin: Date;

   @IsInt()
   @IsPositive()
   Usuario: PersonaRol;

}
