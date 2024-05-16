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

  eliminarProducto(id: number): Observable<Producto> {
    // Método para eliminar un producto
    return this.clientHttp.delete<Producto>(`${this.URL}/${id}`); // Hace una petición DELETE a la URL
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.clientHttp.get<Producto>(`${this.URL}/${id}`);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.clientHttp.put<Producto>(`${this.URL}/${producto.id_producto}`, producto);
  }
}

export class PaginationService {
  private pageSize = 10;
  private currentPage = 0;

  constructor() { }

  getPageSize(): number {
    return this.pageSize;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setPageSize(size: number): void {
    this.pageSize = size;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }
}

