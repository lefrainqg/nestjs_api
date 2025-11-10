import { Routes } from '@nestjs/core';

import * as source from './index';

export const routes: Routes = [
   {
      path: 'v1',
      children: [
         {
            path: '/m_seguridad',
            module: source.SeguridadModule
         },
         {
            path: '/m_catalogo',
            module: source.CatalogoModule
         },
         {
            path: '/m_apis',
            module: source.ApisModule
         }
      ],
   }
];
