import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Periodo } from '@catalogoModels/periodo.entity';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { ExceptionManagerService } from '@sharedServices/exception-manager.service';

@Injectable()
export class PeriodoService {

   constructor(
      @InjectRepository(Periodo)
      private readonly repoPeriodo: Repository<Periodo>,
      private readonly excManager: ExceptionManagerService
   ) { }

   create = async (createDto: CreatePeriodoDto) => {
      try {
         const data = this.repoPeriodo.create(createDto);
         await this.repoPeriodo.save(data);
         return this.findOne(data.prdId);
      } catch (error) {
         this.excManager.handleDBExceptions('PeriodoService', error);
      }
   }

   update = async (id: number, updateDto: UpdatePeriodoDto) => {
      const preData = await this.repoPeriodo.preload({ prdId: id, ...updateDto });
      if (!preData) this.excManager.handleNotFoundException('Periodo', id);
      try {
         await this.repoPeriodo.save(preData);
         return this.findOne(id);
      } catch (error) {
         this.excManager.handleDBExceptions('PeriodoService', error);
      }
   }

   remove = async (id: number) => {
      const data = await this.findOne(id)
      if (!data) this.excManager.handleNotFoundException('Periodo', id);
      await this.repoPeriodo.remove(data);
   }

   findAll = () => {
      return this.repoPeriodo.find({ order: { prdNombre: 'ASC' } });
   }

   findOne = async (id: number) => {
      return await this.repoPeriodo.findOneBy({ prdId: id });
   }

}
