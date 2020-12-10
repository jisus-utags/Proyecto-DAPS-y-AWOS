import { Component, OnInit } from '@angular/core';
import { SlibrosService } from '../../servicios/slibros.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})

export class LibrosComponent implements OnInit {
  
  libros = null;
  lib = {
    idU : null,
    nombre : null,
    categoria : null,
    autor : null,
    editorial : null,
    fecha: null,
    estado : null
  };
    resultado = '';

    operaciones = [
      {valor: 'agregarl', muestraValor: 'Agregar'},
      {valor: 'eliminarl', muestraValor: 'Eliminar'},
      {valor: 'modificarl', muestraValor: 'Modificar'},
      {valor: 'consultarl', muestraValor: 'Consultar'}
    ];
    seleccionada: string = this.operaciones[0].valor;

    operar() {
      switch (this.seleccionada) {
        case 'agregarl' : this.agregarlibro(); this.resultado = 'libro agregado'; break;
        case 'eliminarl' : this.resultado = 'libro eliminado';  break;
        case 'modificarl' : this.resultado = 'libro modificado';  break;
        case 'consultarl' : this.resultado = 'libro consultado'; break;
      }
    }


  constructor(private librosServicio: SlibrosService) { }


  
  ngOnInit(): void {
  }
  irlibros() {
    this.resultado = 'Libro';
  }
  agregarlibro() {
    this.librosServicio.alta(this.lib).subscribe(datos => {
    if (datos['resultado'] === 'OK') {
      alert('alta exitosa');
      alert(datos['mensaje']);
    }  else {
      alert('error al grabar');
    }
  });
}
  recuperarusuarios() {
    this.librosServicio.recuperarTodos().subscribe(result => this.libros = result);
}

}
