import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreatePeriodoDto } from './create-periodo.dto';

export class UpdatePeriodoDto extends PartialType(CreatePeriodoDto) {

   @IsBoolean()
   @IsOptional()
   prdEstado: boolean;

}
