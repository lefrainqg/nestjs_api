import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateRolDto } from './create-rol.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {

   @IsBoolean()
   @IsOptional()
   rolEstado: boolean;

}
