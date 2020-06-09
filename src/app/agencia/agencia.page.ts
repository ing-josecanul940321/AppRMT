import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agencia',
  templateUrl: './agencia.page.html',
  styleUrls: ['./agencia.page.scss'],
})
export class AgenciaPage implements OnInit {
  usuario: { idUsuario: number, idAgencia: number, datosUsuario: any,datosAgenciaDesglose:any} = {
    idUsuario: localStorage.id_usuario,
    idAgencia: localStorage.id_agencia,
    datosUsuario: JSON.parse(localStorage.datosAgencia),
    datosAgenciaDesglose: JSON.parse(localStorage.AgenciaDesglose),
  };
  constructor() { }

  ngOnInit() {
    
  }

}
