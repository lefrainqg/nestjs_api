
// modules
export { SharedModule } from "@shared/shared.module";

// models
export { Rol } from "@seguridadModels/rol.entity";
export { PersonaRol } from "@seguridadModels/persona-rol.entity";

// services
export { RolService } from "@seguridadResources/rol/rol.service";
export { PersonaRolService } from "@seguridadResources/persona-rol/persona-rol.service";

// controllers
export { PersonaRolController } from "@seguridadResources/persona-rol/persona-rol.controller";
export { RolController } from "@seguridadResources/rol/rol.controller";
