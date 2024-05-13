import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricanteService } from '../fabricante.service';
import { ActivatedRoute } from '@angular/router';
import { Fabricante } from '../Models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabricante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabricante.component.html',
  styleUrl: './fabricante.component.css',
})
export class FabricanteComponent implements OnInit {
  fabricantes: Fabricante[] = [];

  constructor(
    private fabricanteService: FabricanteService,
    private route: ActivatedRoute
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
}
