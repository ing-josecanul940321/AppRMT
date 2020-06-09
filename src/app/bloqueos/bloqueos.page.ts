import { Component, OnInit } from '@angular/core';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-bloqueos',
  templateUrl: './bloqueos.page.html',
  styleUrls: ['./bloqueos.page.scss'],
})
export class BloqueosPage implements OnInit {

  usuario: { idUsuario: number, idAgencia: number,datosUsuario:any } = {
    idUsuario: localStorage.id_usuario,
    idAgencia: localStorage.id_agencia,
    datosUsuario: JSON.parse(localStorage.datosAgencia)
  };

  constructor(public iab: InAppBrowser) { }

  ngOnInit() {
  }

  openBloqueos() 
  {
    this.iab.create("https://www.rutamayatravel.com/reservaciones/sur3/bloqueos/movil/idAgencia/"+this.usuario.idAgencia+"/idUsuario/"+this.usuario.idUsuario+"/key/rmt00" ,'hidenavigationbuttons=yes');
  }

}
