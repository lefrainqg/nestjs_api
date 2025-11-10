
import { envs } from "./envs";

//Connection DB
export const DatabaseConfig: any = {
   ssl: process.env.STAGE === 'prod',
   extra: {
      ssl: process.env.STAGE === 'prod'
         ? { rejectUnauthorized: false }
         : null,
      max: 100, //TODO: Maximo Pool de conexion
      idleTimeoutMillis: 2000,
      connectionTimeoutMillis: 30000,
   },
   type: 'postgres',
   host: envs.dbHost,
   port: envs.dbPort,
   database: envs.dbName,
   username: envs.dbUsername,
   password: envs.dbPassword,
   autoLoadEntities: true,
   synchronize: false, //TODO: cambio en alguna entidad automatico sincroniza, NO EN PRODUCCION
}

export enum DatabaseSchema {
   CATALOGO = 'catalogo',
   SEGURIDAD = 'seguridad',
}
