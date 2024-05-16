import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute } from '@angular/router';
import { Fabricante } from '../Models';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-fabricante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css'],
})
export class FabricanteComponent implements OnInit {
  fabricantes: Fabricante[] = [];
  selectedFabricante: Fabricante | null = null; // Variable para almacenar el fabricante seleccionado

  constructor(
    private fabricanteService: FabricanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.fabricantes.length);
    this.route.paramMap.subscribe(() => {
      this.obtenerFabricantes();
    });
  }

  obtenerFabricantes() {
    this.fabricanteService
      .obtenerFabricantes()
      .subscribe((fabricantes) => (this.fabricantes = fabricantes));
  }

  editarFabricante(id: number) {
    console.log('Seleccionado el Fabricante con id ' + id);
    this.router.navigate(['/editar-fabricante', id]);
  }

  openConfirmModal(fabricante: Fabricante) {
    this.selectedFabricante = fabricante;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement); //Aquí se crea una nueva instancia de la clase Modal de Bootstrap
      modal.show();
    }
  }

  confirmDelete() {
    if (this.selectedFabricante) {
      this.fabricanteService
        .borrarFabricante(this.selectedFabricante.id_fabricante)
        .subscribe(() => {
          this.obtenerFabricantes();
          this.selectedFabricante = null;
        });
    }
  }

  cancelDelete() {
    this.selectedFabricante = null;
  }
}
