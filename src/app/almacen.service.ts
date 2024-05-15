import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen } from './Models';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private URL = 'http://localhost:8080/inventario-app/almacenes'; 

  constructor(private HTTPcliente: HttpClient) { }

  obtenerAlmacenes():Observable<Almacen[]> {
    return this.HTTPcliente.get<Almacen[]>(this.URL);
  }

  registrarAlmacen(almacen: Almacen): Observable<Almacen> {
    return this.HTTPcliente.post<Almacen>(this.URL, almacen)
  }

  borrarAlmacen(id: number): Observable<Almacen> {
    return this.HTTPcliente.delete<Almacen>(`${this.URL}/${id}`);
  }
}
