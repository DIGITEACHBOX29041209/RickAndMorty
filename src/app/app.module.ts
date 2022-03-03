import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaMaestraComponent } from './componentes/pagina-maestra/pagina-maestra.component';
import { RickService } from './servicios/rickservices.services';
import { DetalleMaestroComponent } from './componentes/detalle-maestro/detalle-maestro.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaMaestraComponent,
    DetalleMaestroComponent,
    //RickService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
