import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaMaestraComponent } from './componentes/pagina-maestra/pagina-maestra.component';
import { DetalleMaestroComponent } from './componentes/detalle-maestro/detalle-maestro.component';


const routes: Routes = [
  {
    path: '',
    component: PaginaMaestraComponent
  },
  {
    path: 'DetalleMaestro/:idPersonaje',
    component: DetalleMaestroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
