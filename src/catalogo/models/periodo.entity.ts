import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatabaseSchema } from "@config/db-config";
import { PersonaRol } from "@seguridadModels/persona-rol.entity";

@Entity({ name: 'tb_periodo', schema: DatabaseSchema.CATALOGO })
export class Periodo {

   @PrimaryGeneratedColumn({ name: 'prd_id' })
   prdId: number;

   @Column({
      name: 'prd_nombre',
      type: 'text',
      nullable: false
   })
   prdNombre: string;

   @Column({
      name: 'prd_fecha_inicio',
      type: 'date',
      nullable: false,
   })
   prdFechaInicio: Date;

   @Column({
      name: 'prd_fecha_fin',
      type: 'date',
      nullable: false,
   })
   prdFechaFin: Date;

   @Column({
      name: 'prd_estado',
      type: 'boolean',
      default: true
   })
   prdEstado: boolean;

   @ManyToOne(
      () => PersonaRol,
      { eager: true },
   )
   @JoinColumn({ name: 'prd_usu_od', referencedColumnName: 'prolId' })
   Usuario: PersonaRol;

}
