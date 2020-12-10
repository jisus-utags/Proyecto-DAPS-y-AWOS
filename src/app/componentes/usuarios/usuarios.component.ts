import { Component, Input, OnInit } from '@angular/core';
import { SusuariosService } from '../../servicios/susuarios.service';
import { HttpClient } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { NgForm } from '@angular/forms';
import { Iusuarios } from '../../interfaces/iusuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios:any; 

  usu = {
    idU : null,
    nombre : null,
    email : null,
    password : null,
    rol : null,
    estado : null
  };
  
    resultado = '';

  // operaciones = [
  //   {valor: 'agregaru', muestraValor: 'Agregar'},
  //   {valor: 'eliminaru', muestraValor: 'Eliminar'},
  //   {valor: 'modificaru', muestraValor: 'Modificar'},
  //   {valor: 'consultaru', muestraValor: 'Consultar'}
  // ];
  // seleccionada: string = this.operaciones[0].valor;

  // operar() {
  //   switch (this.seleccionada) {
  //     case 'agregaru' : this.registrarUsuarios(); this.resultado = 'Usuario agregado'; break;
  //     case 'eliminaru' : this.resultado = 'Usuario eliminado';  break;
  //     case 'modificaru' : this.resultado = 'Usuario modificado';  break;
  //     case 'consultaru' : this.obtenerUsuarios(); this.resultado = 'Usuario consultado'; break;
  //   }
  // }

  constructor(private susuarios: SusuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.registrarUsuarios();

  }
  // irusuarios() {
  //   this.resultado = 'Usuario';
  // }

  registrarUsuarios() {
      this.susuarios.registrarUsuarios(this.usuarios).subscribe((data: any) => {
      if (data['resultado'] === 'OK') {
        alert('registro exitoso');
        alert(data['mensaje']);
        this.obtenerUsuarios();
      }  
      else {
        alert('error al registrar');
      }
    });
  }

    // registrarUsuarios(forma: ngForm) {
  //   this.susuarios.registrarUsuarios(this.usu).then((data: any) => {
  //     Toast.fire(data.msg, '', 'success');
  //     forma.reset();
  //   }).catch((err) => {
  //     Toast.fire(err.error.msg, '', 'error');
  //   })
  // };


  obtenerUsuarios() {
    this.susuarios.consultarUsuarios().subscribe(resultado => this.usuarios = resultado)
  };


  eliminarUsuario(){

  };

  hayRegistros() {
    return true;
  } 

}
