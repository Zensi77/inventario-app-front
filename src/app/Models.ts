export class Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  existencia: number;
  fabricante: Fabricante;
}

export class Fabricante {
  id_fabricante: number;
  nombre: string;
  direccion: string;
  telefono: string;
}