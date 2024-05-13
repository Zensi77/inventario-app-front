import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router'; //Sirve para redirigir a otra ruta
import { FormsModule } from '@angular/forms'; // Se importa FormsModule para poder usar ngModel

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent {
  ngOnInit() {
    let fabricante = document.getElementById('fabricante');
    let choise = document.getElementById('fabricante');

    


  }

  producto: Producto = new Producto();
  
  constructor(private productoService: ProductoService, private enrutador: Router) { }

  // Metodo para registrar un producto
  onSubmit() {
    this.productoService.agregarProducto(this.producto).subscribe(() => {
      this.enrutador.navigate(['/productos']); // Redirige a la ruta /productos cuando se registra un producto
    });
  }
}
