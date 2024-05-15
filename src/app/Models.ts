export class Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  existencia: number;
  fabricante: {
    id_fabricante: number;
    nombre: string;
    direccion: string;
    telefono: string;
  };
}

export class Fabricante {
  id_fabricante: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

export class Almacen {
  id_almacen: number;
  nombre: string;
  direccion: string;
  telefono: string;
}
