import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../provider/api.service';
import * as Moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items:any;
  reservaciones:any;
  reservacionDesglose:any;
  loader:any;

  usuario: { idUsuario: number, idAgencia: number,datosUsuario:any } = {
    idUsuario: localStorage.id_usuario,
    idAgencia: localStorage.id_agencia,
    datosUsuario: JSON.parse(localStorage.datosAgencia)
  };

  constructor(
    public navCtrl: NavController,
    public api:ApiService,private iab: InAppBrowser) {}

    
  openBuscador(){
    if(localStorage.getItem("FechaInicio") == null )
    {
      localStorage.setItem("FechaInicio", Moment().format('DD/MM/YYYY'));
    }
    if(localStorage.getItem("FechaFin") == null)
    {
      localStorage.setItem("FechaFin", Moment().add(3, 'd').format('DD/MM/YYYY'));
    }
    this.navCtrl.navigateForward("buscador");
  }

  openReservacion(){
    this.navCtrl.navigateForward("reservaciones");
  }

  openContacto(){
    this.navCtrl.navigateForward("contacto");
  }

  openBloqueos(){
    this.navCtrl.navigateForward("bloqueos");
  }

  openBlog(){
    this.iab.create("http://www.rutamayatravel.com.mx/blog/" ,'hidenavigationbuttons=yes');
  }

  openFormulario() 
  {   
  this.iab.create(" http://eepurl.com/c5oZ05" ,'hidenavigationbuttons=yes');
  }

  postReservation(){
    this.api.postReservation(localStorage.email_usuario,localStorage.clave_usuario,localStorage.id_agencia)
    .then(data=> {  
      this.reservaciones=data;
      this.initializeItems();
    });
   }

   initializeItems()
   {
    this.items=this.reservaciones;
   }

}
