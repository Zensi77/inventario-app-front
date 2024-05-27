import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen, Producto, ProductoAlmacen } from './Models';

@Injectable({
  providedIn: 'root',
})
export class ProductoAlmacenService {
  private URL = 'http://localhost:8080/inventario-app/productos-almacen';

  constructor(private HTTPcliente: HttpClient) {}

  obtenerProductos(almacen: Almacen): Observable<ProductoAlmacen[]> {
    return this.HTTPcliente.get<ProductoAlmacen[]>(
      `${this.URL}/${almacen.id_almacen}`
    );
  }

  eliminarArticuloAlmacen(producto: Producto, almacen: Almacen) {
    this.HTTPcliente.delete(
      `${this.URL}/${producto.id_producto}/${almacen.id_almacen}`
    ).subscribe();
  }

  modificarProductoAlmacen(
    productoAlmacen: ProductoAlmacen,
    cantidad: number
  ): void {
    console.log(productoAlmacen, cantidad); // Asegúrate de que estos valores son correctos
    this.HTTPcliente.put<ProductoAlmacen>(
      `${this.URL}/${productoAlmacen.producto.id_producto}/${productoAlmacen.almacen.id_almacen}/${cantidad}`,
      {}
    ).subscribe(
      (response) => console.log('Producto modificado exitosamente', response),
      (error) => console.error('Error al modificar el producto', error)
    );
  }

  insertarProductoAlmacen(productoAlmacen: ProductoAlmacen): void {
    console.log(productoAlmacen);
    this.HTTPcliente.post<ProductoAlmacen>(
      `${this.URL}`,
      productoAlmacen
    ).subscribe(
      (response) => console.log('Producto insertado exitosamente', response),
      (error) => console.error('Error al insertar el producto', error)
    );
  }
}
