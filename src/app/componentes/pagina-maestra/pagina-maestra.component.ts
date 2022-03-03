import { Component, OnInit } from '@angular/core';
import { RickService } from 'src/app/servicios/rickservices.services';
import {CookieService} from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-maestra',
  templateUrl: './pagina-maestra.component.html',
  styleUrls: ['./pagina-maestra.component.css']
})
export class PaginaMaestraComponent implements OnInit {

  totalResul: string | undefined;
  pagActual: string| undefined;


  characters: string | undefined;
  episodes: string| undefined;
  locations: string| undefined;

  Paginacion: any[] = [];
  ListaLike: any[] = [];
  ListaNoLike: any[] = [];

  ListaTarjetas: any[] = [];
  
  constructor(private rickService: RickService, private cookies:CookieService, public router: Router) { }

  ngOnInit(): void {
    this.CargarInformacionPrinciapal();
  }

  CargarInformacionPrinciapal(){

   this.rickService.ConsultaUrlsApiGeneral().subscribe(respuesta => {
      this.characters = respuesta.characters;
      this.episodes = respuesta.episodes;
      this.locations = respuesta.locations;

      var auxPage: string;
      if(this.cookies.get('pagNo') != '' && this.cookies.get('pagNo') != undefined && this.cookies.get('pagNo') != null){
        auxPage = '?page=' + this.cookies.get('pagNo') ;
        this.pagActual = 'Page ' + this.cookies.get('pagNo');
      }else{
        auxPage = '';
        this.pagActual = 'Page 1';
      }

      
      this.rickService.ConsumirUrlApiSubGeneral(respuesta.characters+auxPage).subscribe(respuesta => {

        this.totalResul = respuesta.info.count;
        this.ListaTarjetas = respuesta.results;
      
        for(var i = 0 ; i < respuesta.info.pages ; i++){
          this.Paginacion[i] = i+1;
        }

        for(var i = 0 ; i < this.ListaTarjetas.length ; i++){
          
          if(this.cookies.get(this.ListaTarjetas[i].id + 'Like') == '1' ){
            this.ListaLike[i] = '1';
          }else{
            this.ListaLike[i] = '0';
          }

          if(this.cookies.get(this.ListaTarjetas[i].id + 'NoLike') == '1' ){
            this.ListaNoLike[i] = '1';
          }else{
            this.ListaNoLike[i] = '0';
          }

        }

      })
    })
  }

  SeleccionarBtnMeGusta(arreglo: any){
    for(var i = 0 ; i < this.ListaTarjetas.length ; i++){
      if(arreglo.id  == this.ListaTarjetas[i].id ){

        if(this.ListaLike[i] == '1'){
          this.ListaLike[i] = '0';
          this.cookies.set(arreglo.id + 'Like', '0')
        }else{
          this.ListaLike[i] = '1';
          this.cookies.set(arreglo.id + 'Like', '1')
        }   
        this.ListaNoLike[i] = '0';
        this.cookies.set(arreglo.id + 'NoLike', '0')
      }
    }
  
  }

  SeleccionarBtnNoMeGusta(arreglo: any){
    for(var i = 0 ; i < this.ListaTarjetas.length ; i++){
      if(arreglo.id  == this.ListaTarjetas[i].id ){
        if(this.ListaNoLike[i] == '1'){
          this.ListaNoLike[i] = '0';
          this.cookies.set(arreglo.id + 'NoLike', '0')
        }else{
          this.ListaNoLike[i] = '1';
          this.cookies.set(arreglo.id + 'NoLike', '1')
        }   
        this.ListaLike[i] = '0';
        this.cookies.set(arreglo.id + 'Like', '0')
      }
    }
  }

  SeleccionarPaginaBtn(idPagina: number){

    this.cookies.set('pagNo', (idPagina+1).toString()) ;
    var auxPag = idPagina+1;

    this.pagActual = 'Página ' + auxPag.toString();

    if(this.characters != undefined){
      this.rickService.ConsumirUrlApiSubGeneral(this.characters + '?page=' + auxPag.toString()).subscribe(respuesta => {

       this.totalResul = respuesta.info.count;
        this.ListaTarjetas = respuesta.results;
        
        //Paginacion de la parte inferior
        for(var i = 0 ; i < respuesta.info.pages ; i++){
          this.Paginacion[i] = i+1;
        }

        for(var i = 0 ; i < this.ListaTarjetas.length ; i++){
          if(this.cookies.get(this.ListaTarjetas[i].id + 'Like') == '1' ){
            this.ListaLike[i] = '1';
          }else{
            this.ListaLike[i] = '0';
          }

          if(this.cookies.get(this.ListaTarjetas[i].id + 'NoLike') == '1' ){
            this.ListaNoLike[i] = '1';
          }else{
            this.ListaNoLike[i] = '0';
          }

        }

        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
  
      })
    }

  }

  DetallePersonaje(arreglo: any){
    this.router.navigate(['DetalleMaestro/'+ arreglo.id] );
  }
}
