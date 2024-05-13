import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fabricante } from './Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FabricanteService {
  private URL = 'http://localhost:8080/inventario-app/fabricantes'; // URL to web api

  constructor(private clienteHTTP: HttpClient) {}

  obtenerFabricantes(): Observable<Fabricante[]> {
    return this.clienteHTTP.get<Fabricante[]>(this.URL);
  }
}
