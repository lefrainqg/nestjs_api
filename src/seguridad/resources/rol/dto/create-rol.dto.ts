import { IsString, MinLength } from "class-validator";

export class CreateRolDto {

   @IsString()
   @MinLength(1)
   rolNombre: string;

   @IsString()
   @MinLength(1)
   rolUrl: string;

   @IsString()
   @MinLength(1)
   rolColor: string;

}
