import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RickService {

    constructor(private http: HttpClient) { }


    ConsultaUrlsApiGeneral() {
        return this.http.get<any>('https://rickandmortyapi.com/api');
    }

    ConsumirUrlApiSubGeneral(url: string) {
        return this.http.get<any>(url);
    }

    //?page=19

}