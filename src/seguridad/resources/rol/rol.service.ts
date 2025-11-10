import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rol } from '@seguridadModels/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ExceptionManagerService } from '@sharedServices/exception-manager.service';

@Injectable()
export class RolService {

   constructor(
      @InjectRepository(Rol)
      private readonly repoRol: Repository<Rol>,
      private readonly excManager: ExceptionManagerService
   ) { }

   create = async (createDto: CreateRolDto) => {
      try {
         const data = this.repoRol.create(createDto);
         await this.repoRol.save(data);
         return this.findOne(data.rolId);
      } catch (error) {
         this.excManager.handleDBExceptions('RolService', error);
      }
   }

   update = async (id: number, updateDto: UpdateRolDto) => {
      const preData = await this.repoRol.preload({ rolId: id, ...updateDto });
      if (!preData) this.excManager.handleNotFoundException('Rol', id);
      try {
         await this.repoRol.save(preData);
         return this.findOne(id);
      } catch (error) {
         this.excManager.handleDBExceptions('RolService', error);
      }
   }

   remove = async (id: number) => {
      const data = await this.findOne(id)
      if (!data) this.excManager.handleNotFoundException('Rol', id);
      await this.repoRol.remove(data);
   }

   findAll = () => {
      return this.repoRol.find({ order: { rolNombre: 'ASC' } });
   }

   findOne = async (id: number) => {
      return await this.repoRol.findOneBy({ rolId: id });
   }

}
