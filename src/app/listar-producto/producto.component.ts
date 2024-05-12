import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit{
  productos: Producto[];

  constructor(private productoServicio: ProductoService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Esto lo que hace es que cuando se cambie de ruta, se vuelva a cargar la lista de productos
    this.route.paramMap.subscribe(() => {
      this.obtenerProductos();
    });
  }
  

  // metodo para obtener productos
  // subscribe: se suscribe a los cambios de la petición
  // Expresion lambda (productos => this.productos = productos): asigna el resultado de la petición 
  obtenerProductos() { 
    this.productoServicio.obtenerProductos().subscribe(productos => this.productos = productos);
  }
}
