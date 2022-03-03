import { Component, OnInit } from '@angular/core';
import { RickService } from 'src/app/servicios/rickservices.services';
import {CookieService} from 'ngx-cookie-service'
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-maestro',
  templateUrl: './detalle-maestro.component.html',
  styleUrls: ['./detalle-maestro.component.css']
})
export class DetalleMaestroComponent implements OnInit {

  IdPersonaje: string | undefined;

  characters: string | undefined;
  episodes: string | undefined;
  locations: string | undefined;

  Like: string | undefined;
  NotLike: string | undefined;

  created: string | undefined;
  gender: string | undefined;
  id: string | undefined;
  image: string | undefined;
  name: string | undefined;
  species: string | undefined;
  status: string | undefined;
  type: string | undefined;
  
  locationName: string | undefined;
  locationUrl: string | undefined;

  locationcreated: string | undefined;
  locationdimension: string | undefined;
  locationid: string | undefined;
  locationname: string | undefined;
  locationtype: string | undefined;

  OriginName: string | undefined;
  OriginUrl: string | undefined;

  Origincreated: string | undefined;
  Origindimension: string | undefined;
  Originid: string | undefined;
  Originname: string | undefined;
  Origintype: string | undefined;

  constructor(private rickService: RickService, private cookies:CookieService, 
    public router: Router,public ActivatedRoute_: ActivatedRoute)  { }

  ngOnInit(): void {
    let idP = this.ActivatedRoute_.snapshot.paramMap.get('idPersonaje');
    this.IdPersonaje = '';
    this.IdPersonaje += idP;

    this.CargaInicial();
  }

  CargaInicial(){

    this.rickService.ConsultaUrlsApiGeneral().subscribe(respuesta => {
      this.characters = respuesta.characters;
      this.episodes = respuesta.episodes;
      this.locations = respuesta.locations;
      
      this.rickService.ConsumirUrlApiSubGeneral(respuesta.characters + '/' + this.IdPersonaje ).subscribe(respuesta => {
        this.created = respuesta.created;
        this.gender = respuesta.gender;
        this.id = respuesta.id;
        this.image = respuesta.image;
        this.name = respuesta.name;
        this.species = respuesta.species;
        this.status = respuesta.status;
        this.type = respuesta.type;

        this.locationName = respuesta.location.name;
        this.locationUrl = respuesta.location.url;

        this.OriginName = respuesta.origin.name;
        this.OriginUrl = respuesta.origin.url;

        this.Like =   this.cookies.get(this.id + 'Like');
        this.NotLike =  this.cookies.get(this.id + 'NoLike');

        if(this.locationUrl != undefined &&
          this.locationUrl != '' &&
          this.locationUrl != null){
            this.rickService.ConsumirUrlApiSubGeneral(this.locationUrl).subscribe(respuesta => {
              this.locationcreated = respuesta.created;
              this.locationdimension= respuesta.dimension;
              this.locationid= respuesta.id;
              this.locationname= respuesta.name;
              this.locationtype= respuesta.type;
            })
        }

        if(this.OriginUrl != undefined &&
          this.OriginUrl != '' &&
          this.OriginUrl != null){
            this.rickService.ConsumirUrlApiSubGeneral(this.OriginUrl).subscribe(respuesta => {
              this.Origincreated = respuesta.created;
              this.Origindimension= respuesta.dimension;
              this.Originid= respuesta.id;
              this.Originname= respuesta.name;
              this.Origintype= respuesta.type;
            })
        }

      })
    })
  }

  SeleccionarBtnMeGusta(){

    if(this.Like == '1'){
      this.Like = '0';
      this.cookies.set(this.id + 'Like', '0')
    }else{
      this.Like = '1';
      this.cookies.set(this.id + 'Like', '1')
    }   

    this.NotLike = '0';
    this.cookies.set(this.id + 'NoLike', '0')
  }

  SeleccionarBtnNoMeGusta(){
    if(this.NotLike == '1'){
      this.NotLike = '0';
      this.cookies.set(this.id + 'NoLike', '0')
    }else{
      this.NotLike = '1';
      this.cookies.set(this.id + 'NoLike', '1')
    }   

    this.Like = '0';
    this.cookies.set(this.id + 'Like', '0')
  }

}
