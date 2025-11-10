import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { PersonaRolService } from './persona-rol.service';
import { CreatePersonaRolDto } from './dto/create-persona-rol.dto';
import { UpdatePersonaRolDto } from './dto/update-persona-rol.dto';

@Controller('persona_rol')
export class PersonaRolController {

   constructor(private readonly rolService: PersonaRolService) { }

   @Post()
   create(@Body() createRolDto: CreatePersonaRolDto) {
      return this.rolService.create(createRolDto);
   }

   @Patch(':id')
   update(@Param('id', ParseIntPipe) id: number, @Body() updateRolDto: UpdatePersonaRolDto) {
      return this.rolService.update(id, updateRolDto);
   }

   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.rolService.remove(id);
   }

   @Get()
   findAll() {
      return this.rolService.findAll();
   }

   @Get('id/:id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.rolService.findOne(id);
   }

}
