import { HttpClient } from '@angular/common/http'; // Client HTTP para hacer peticiones
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './Models';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private URL = 'http://localhost:8080/inventario-app/productos'; // URL to web api

  constructor(private clientHttp: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    // Método para obtener productos
    return this.clientHttp.get<Producto[]>(this.URL); // Hace una petición GET a la URL
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    // Método para agregar un producto
    return this.clientHttp.post<Producto>(this.URL, producto); // Hace una petición POST a la URL
  }
}
