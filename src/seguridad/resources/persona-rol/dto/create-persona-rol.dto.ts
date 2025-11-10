import { IsInt, IsPositive } from "class-validator";

export class CreatePersonaRolDto {

   @IsInt()
   @IsPositive()
   prolPerId: number;

   @IsInt()
   @IsPositive()
   prolRolId: number;

}
