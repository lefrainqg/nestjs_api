import { DatabaseSchema } from '@config/db-config';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ name: 'tb_rol', schema: DatabaseSchema.SEGURIDAD })
export class Rol {

   @PrimaryGeneratedColumn({ name: 'rol_id' })
   rolId: number;

   @Column({
      name: 'rol_nombre',
      type: 'character varying',
      nullable: false
   })
   rolNombre: string;

   @Column({
      name: 'rol_url',
      type: 'character varying',
      nullable: false
   })
   rolUrl: string;

   @Column({
      name: 'rol_color',
      type: 'character varying',
      nullable: false
   })
   rolColor: string;

   @Column({
      name: 'rol_estado',
      type: 'boolean',
      nullable: false,
      default: true
   })
   rolEstado: boolean;

}
