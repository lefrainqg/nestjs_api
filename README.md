

## Project

Proyecto de API REST con [Nest](https://github.com/nestjs/nest) framework, se utiliza gestor de paquetes [pnpm](https://pnpm.io/)

## Setup

```bash
$ pnpm install
```

## Compile and run

```bash
# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod

# build
$ pnpm build
```

## Deployment

Documentación framework [deployment documentation](https://docs.nestjs.com/deployment)


## DB

### Script: db_temp
 Estructura para PostgreSQL con dos esquemas:
   - seguridad  → Contiene tablas: tb_rol, tb_persona_rol.
   - catalogo   → Contiene la tabla: tb_periodo.

### 1. Create db
```bash
CREATE DATABASE db_temp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Ecuador.1252'
    LC_CTYPE = 'Spanish_Ecuador.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
⚠️ NOTA: PostgreSQL no soporta la instrucción USE (como SQL Server).
Luego de crear la base, conéctate usando:
\connect db_temp
o selecciona manualmente la base desde tu cliente (pgAdmin, DBeaver, etc.)

### 2. Create schema: seguridad > tb_rol y tb_persona_rol
```bash
CREATE SCHEMA IF NOT EXISTS seguridad
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS seguridad.tb_rol
(
    rol_id serial NOT NULL,
    rol_nombre varchar NOT NULL,
    rol_url varchar NOT NULL,
    rol_color varchar NOT NULL,
    rol_estado boolean NOT NULL DEFAULT true,
    CONSTRAINT tb_rol_pkey PRIMARY KEY (rol_id)
);

CREATE TABLE IF NOT EXISTS seguridad.tb_persona_rol
(
    prol_id serial NOT NULL,
    prol_per_id integer NOT NULL,
    prol_rol_id integer NOT NULL,
    prol_estado boolean NOT NULL DEFAULT true,
    prol_fecha_creacion timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT rol_servidor_pkey PRIMARY KEY (prol_id),
    CONSTRAINT fk_rol FOREIGN KEY (prol_rol_id)
        REFERENCES seguridad.tb_rol (rol_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```
### 3. Create schema: catalogo > tb_periodo
```bash
CREATE SCHEMA IF NOT EXISTS catalogo
    AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS catalogo.tb_periodo
(
    prd_id serial NOT NULL,
    prd_nombre varchar NOT NULL,
    prd_fecha_inicio date,
    prd_fecha_fin date,
    prd_estado boolean NOT NULL DEFAULT true,
    prd_usu_id integer NOT NULL,
    CONSTRAINT tb_periodo_pkey PRIMARY KEY (prd_id),
    CONSTRAINT fk_persona_rol FOREIGN KEY (prd_usu_id)
        REFERENCES seguridad.tb_persona_rol (prol_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
```

### End Script
