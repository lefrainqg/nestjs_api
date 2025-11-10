import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Rol } from './rol.entity';
import { DatabaseSchema } from '@config/db-config';

@Entity({ name: 'tb_personal_rol', schema: DatabaseSchema.SEGURIDAD })
export class PersonaRol {

   @PrimaryGeneratedColumn({ name: 'prol_id' })
   prolId: number;

   @Column({
      name: 'prol_per_id',
      type: 'integer',
      nullable: false
   })
   prolPerId: number;

   @ManyToOne(
      () => Rol,
      { eager: true },
   )
   @JoinColumn({ name: 'prol_rol_id', referencedColumnName: 'rolId' })
   Rol: Rol;

   @Column({
      name: 'prol_estado',
      type: 'boolean',
      default: true
   })
   prolEstado: boolean;

   @Column({
      name: 'prol_fecha_creacion',
      type: 'time without time zone',
      default: new Date()
   })
   prolFechaCreacion: Date;

}
