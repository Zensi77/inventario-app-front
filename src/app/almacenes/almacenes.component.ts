import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { Almacen, Producto } from '../Models';
import { AlmacenService } from '../almacen.service';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-almacenes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './almacenes.component.html',
  styleUrl: './almacenes.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
  
  
export class AlmacenesComponent implements OnInit{
  almacenes: Almacen[] = []
  articulos: Producto[] = []
  listaArticulos: Producto[] = []

  almacenSeleccionado: Almacen | any = null
  almacenEditar:Almacen | any = null;
  almacenesFiltrados: Almacen[] = []
  almacenNuevo: Almacen | any = null
  almacenBorrar: Almacen | any = null

  private modal: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
  ) {}

  ngOnInit() {
    this.obtenerAlmacenes()
  }

  obtenerAlmacenes() {
    this.almacenService.obtenerAlmacenes().subscribe(almacenes => {
      this.almacenes = almacenes
      this.almacenesFiltrados = almacenes
    });
  }

  seleccionarAlmacen(almacen: Almacen) {
    this.almacenSeleccionado = almacen;
  }

  agregarAlmacen() {
    this.almacenNuevo = {id_alamcen: null, nombre: '', direccion: '', telefono: ''};
  }
  
  editarAlmacen(almacen: Almacen, event: Event) { 
    event.stopPropagation() // Evita que el evento se propague a otros elementos
    this.almacenEditar = almacen;
  }

  openModal(almacen: Almacen, event: Event) {
    event.stopPropagation(); 
    this.almacenBorrar = almacen;

    const modalElement = document.getElementById('confirmDeleteModal');
        if (modalElement) {
          // Se crea una nueva instancia de la clase Modal de Bootstrap
          this.modal = new (window as any).bootstrap.Modal(modalElement);
          // Se muestra el modal
          this.modal.show();
        }

  }

  confirmDelete() {
    this.almacenService.borrarAlmacen(this.almacenBorrar.id_almacen).subscribe(() => {
      this.obtenerAlmacenes();
      this.almacenBorrar = null;
    });
  }

  cancelDelete() {
    this.almacenBorrar = null;
  }
  
  mostrarAlmacen(almacen: Almacen, event: Event) {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
  }

  filtrarAlmacenes(event: Event) {
    const valor = (event.target as HTMLInputElement).value
    this.almacenesFiltrados = this.almacenes.filter(almacen => {
      return almacen.nombre.toLowerCase().includes(valor.toLowerCase())
    })
  }

  onSubmitEditar() { 
    return this.almacenService.actualizarAlmacen(this.almacenEditar).subscribe(() => {
      this.obtenerAlmacenes();
      this.almacenEditar = null; // Regrasa a null para ocultar el formulario
    });
  }

  onSubmitAgregar() {
    this.almacenService.registrarAlmacen(this.almacenNuevo).subscribe(() => {
      this.obtenerAlmacenes();
      this.almacenNuevo = null;
    });
  }

  cancelarEdicion() {
    this.almacenEditar = null;
  }



}
