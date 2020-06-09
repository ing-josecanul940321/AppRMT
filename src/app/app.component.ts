import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  usuario: { nombre_usuario: string, nombre_agencia: string, datosUsuario:any }= {
    nombre_usuario: "",
    nombre_agencia: "",
    datosUsuario: ""
  };

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Reservaciones',
      url: '/reservaciones',
      icon: 'calendar'
    },
    {
      title: 'Bloqueos y grupos',
      url: '/bloqueos',
      icon: 'people'
    },
    {
      title: 'Contacto',
      url: '/contacto',
      icon: 'call'
    }
    ,
    {
      title: 'Mi agencia',
      url: '/agencia',
      icon: 'card'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public events: Events
  ) {
    this.initializeApp();    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);

      if ( typeof localStorage.getItem('nombre_agencia')!== 'undefined' && localStorage.getItem('nombre_agencia') !== null){
        this.usuario = {
           nombre_usuario: localStorage.nombre_usuario,
           nombre_agencia: localStorage.nombre_agencia,
           datosUsuario: JSON.parse(localStorage.datosAgencia)
         };
       }
    });
  }

  logout() 
  {         
    localStorage.clear();
    this.navCtrl.navigateRoot("login");
  }
}
