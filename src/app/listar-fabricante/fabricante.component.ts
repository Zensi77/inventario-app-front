import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute } from '@angular/router';
import { Fabricante } from '../Models';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imports de Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css'],
})
export class FabricanteComponent implements OnInit, AfterViewInit {
  fabricantes: Fabricante[] = [];
  selectedFabricante: Fabricante | null = null; // Fabricante seleccionado para borrar

  private modal: any; // Modal de confirmación

  displayedColumns: string[] = ['nombre', 'direccion', 'telefono', 'acciones']; // Columnas de la tabla
  dataSource = new MatTableDataSource<Fabricante>([]); // Datos de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginador de la tabla
  @ViewChild(MatSort) sort!: MatSort; // Ordenador de la tabla

  constructor(
    private fabricanteService: FabricanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Obtiene los fabricantes al iniciar el componente
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.obtenerFabricantes();
    });
  }

  // Inicializa el paginador y el ordenador de la tabla
  ngAfterViewInit(): void {
    setTimeout(() => { // Se espera un tiempo para que se cargue la tabla, si no el paginador no se inicializa correctamente
      // Se espera un tiempo para que se cargue la tabla
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 30);
  }

  // Obtiene los fabricantes y los añade a la tabla
  obtenerFabricantes() {
    this.fabricanteService.obtenerFabricantes().subscribe((fabricantes) => {
      this.dataSource.data = fabricantes;
    });
  }

  editarFabricante(id: number) {
    this.router.navigate(['/editar-fabricante', id]);
  }

  // Abre un modal de confirmación para borrar un fabricante
  // Se le pasa el fabricante seleccionado y se muestra el modal
  openConfirmModal(fabricante: Fabricante) {
    this.selectedFabricante = fabricante;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modal = new (window as any).bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  // El modal llama a esta función para borrar el fabricante
  confirmDelete() {
    if (this.selectedFabricante) {
      this.fabricanteService
        .borrarFabricante(this.selectedFabricante.id_fabricante)
        .subscribe(() => {
          this.obtenerFabricantes();
          this.selectedFabricante = null;
        });
    }

    this.modal.hide();
  }

  // El modal llama a esta función para cancelar el borrado
  cancelDelete() {
    this.selectedFabricante = null;
  }

  // Hace un filtrado de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
