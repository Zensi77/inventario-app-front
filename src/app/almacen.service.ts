import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, Producto, ProductoAlmacen } from './Models';

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

  actualizarAlmacen(almacen: Almacen): Observable<Almacen> {
    return this.HTTPcliente.put<Almacen>(`${this.URL}/${almacen.id_almacen}`, almacen);
  }

  borrarAlmacen(id: number): Observable<Almacen> {
    return this.HTTPcliente.delete<Almacen>(`${this.URL}/${id}`);
  }

  obtenerArticulosAlmacen(id:number): Observable<Producto[]> {
    return this.HTTPcliente.get<Producto[]>(`${this.URL}/${id}`);
  }
}

export class ProductoAlmacenService {
  private URL = 'http://localhost:8080/inventario-app/productos';

  constructor(private HTTPcliente: HttpClient) {}

  obtenerProductos(): Observable<ProductoAlmacen[]> {
    return this.HTTPcliente.get<ProductoAlmacen[]>(this.URL);
  }
  
}
