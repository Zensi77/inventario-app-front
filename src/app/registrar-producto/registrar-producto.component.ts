import { Component } from '@angular/core';
import { Fabricante, Producto } from '../Models';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router'; //Sirve para redirigir a otra ruta
import { FormsModule } from '@angular/forms'; // Se importa FormsModule para poder usar ngModel
import { FabricanteService } from '../fabricante.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Servicio para mostrar notificaciones
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css',
})
export class RegistrarProductoComponent {
  fabricantes: Fabricante[]; // Se crea un array de fabricantes
  producto: Producto = new Producto();
  terminoBusqueda: string = '';
  fabricantesFiltrados: Fabricante[];

  imagen: File | null = null; // mismo nombre que en el backend
  imagenURL: string | null = null;

  constructor(
    private productoService: ProductoService,
    private fabricanteService: FabricanteService,
    private enrutador: Router,
  ) {}

  ngOnInit() {
    // Se obtienen los fabricantes
    this.fabricanteService.obtenerFabricantes().subscribe((fabricantes) => {
      this.fabricantes = fabricantes;
      this.fabricantesFiltrados = fabricantes;
    });
  }

  // Metodo para registrar un producto
  onSubmit() {
    const formData = new FormData();

    // Se agrega la información del producto al formData, puesto que el backend espera un formData
    formData.append(
      'producto',
      new Blob([JSON.stringify(this.producto)], { type: 'application/json' })
    ); // Se convierte el objeto a JSON
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }

    this.productoService.agregarProducto(formData).subscribe((response) => {
      console.log(response);
    });

    this.enrutador.navigate(['/productos']);
  }

  // Metodo para seleccionar una imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      this.imagen = file;

      // Crear una URL de la imagen seleccionada para la previsualización
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenURL = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagen = null;
      this.imagenURL = null;
      alert('Solo se permiten imágenes PNG');
    }
  }

  // Metodo para filtrar los fabricantes por nombre
  // con ngModel de la vista se actualiza el terminoBusqueda en tiempo real y se llama a este metodo
  filtrarFabricantes(): void {
    const termino = this.terminoBusqueda.toLowerCase();

    this.fabricantesFiltrados = this.fabricantes.filter((fabricante) =>
      fabricante.nombre.toLowerCase().includes(termino)
    );
  }
}
