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

  obtenerFabricante(id: number): Observable<Fabricante> {
    return this.clienteHTTP.get<Fabricante>(this.URL + '/' + id);
  }

  registrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.clienteHTTP.post<Fabricante>(this.URL, fabricante);
  }

  editarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.clienteHTTP.put<Fabricante>(this.URL, fabricante);
  }

  borrarFabricante(id: number): Observable<Fabricante> {
    return this.clienteHTTP.delete<Fabricante>(this.URL + '/' + id);
  }
}
