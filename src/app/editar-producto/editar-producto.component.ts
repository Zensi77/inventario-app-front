import { Component } from '@angular/core';
import { Producto, Fabricante } from '../Models';
import { ProductoService } from '../producto.service';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css',
})
export class EditarComponent {
  producto: Producto = new Producto();
  private id: number;
  fabricantes: Fabricante[]; 
  fabricanteVijejo: Fabricante;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private fabricanteService: FabricanteService) { }
  
  ngOnInit() { 
        this.id = this.route.snapshot.params['id'];
        this.productoService.obtenerProducto(this.id).subscribe((producto) => {
          this.producto = producto; // Obtenemos el producto a editar
          this.fabricanteVijejo = producto.fabricante;
        });

    this.fabricanteService.obtenerFabricantes().subscribe((fabricantes) => {
          this.fabricantes = fabricantes; // Obtenemos los fabricantes
        });
  }

  onSubmit() { 
    this.productoService.actualizarProducto(this.producto).subscribe((producto) => {
      this.router.navigate(['/productos']); // Redirigimos a la lista de productos
    });
  }
}
