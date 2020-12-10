import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iusuarios } from '../interfaces/iusuarios';

@Injectable({
  providedIn: 'root'
})
export class SusuariosService {
  url = 'https://proyecto final.herokuapp.com';

  constructor(private http: HttpClient) { }

  consultarUsuarios() {
    return this.http.get(`${this.url}/usuarios`)
  }

  consultarUsuario(idU: String) {
    return this.http.get(`${this.url}/usuarios${idU}`)
  }

  // registrarUsuarios(usuarios) {
  //   alert(usuarios);
  //   alert(JSON.stringify(usuarios));
  //   alert('usuario registrado');
  //   return this.http.post(`${this.url}/usuarios/registro`, JSON.stringify(usuarios));
  // }

  registrarUsuarios(usuarios: Iusuarios) {
    return this.http.post(`${this.url}/usuarios/registro`, JSON.stringify(usuarios))
  }

  eliminarUsuario(){

  }

}
