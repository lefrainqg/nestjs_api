import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PersonaRol } from '@seguridadModels/persona-rol.entity';
import { CreatePersonaRolDto } from './dto/create-persona-rol.dto';
import { UpdatePersonaRolDto } from './dto/update-persona-rol.dto';
import { ExceptionManagerService } from '@sharedServices/exception-manager.service';

@Injectable()
export class PersonaRolService {

   constructor(
      @InjectRepository(PersonaRol)
      private readonly repoPersonaRol: Repository<PersonaRol>,
      private readonly excManager: ExceptionManagerService
   ) { }

   create = async (createDto: CreatePersonaRolDto) => {
      try {
         const data = this.repoPersonaRol.create(createDto);
         await this.repoPersonaRol.save(data);
         return this.findOne(data.prolId);
      } catch (error) {
         this.excManager.handleDBExceptions('PersonaRolService', error);
      }
   }

   update = async (id: number, updateDto: UpdatePersonaRolDto) => {
      const preData = await this.repoPersonaRol.preload({ prolId: id, ...updateDto });
      if (!preData) this.excManager.handleNotFoundException('PersonaRol', id);
      try {
         await this.repoPersonaRol.save(preData);
         return this.findOne(id);
      } catch (error) {
         this.excManager.handleDBExceptions('PersonaRolService', error);
      }
   }

   remove = async (id: number) => {
      const data = await this.findOne(id)
      if (!data) this.excManager.handleNotFoundException('PersonaRol', id);
      await this.repoPersonaRol.remove(data);
   }

   findAll = () => {
      return this.repoPersonaRol.find({ order: { prolId: 'ASC' } });
   }

   findOne = async (id: number) => {
      return await this.repoPersonaRol.findOneBy({ prolId: id });
   }

}
