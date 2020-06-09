import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController,NavController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // url: string = 'https://apituristico.com/rmt/WebServiceRMT.asmx';
  url: string = 'https://test.apituristico.com/rmt/WebServiceRMT.asmx';
  testurl: string = 'https://test.apituristico.com/rmt/WebServiceRMT.asmx';
  urlLiga: string = 'https://www.rutamayatravel.com/sur4test/';
  urlTest: string = 'https://www.rutamayatravel.com/sur4test/';
  urlHotelDestino = this.urlLiga + "busqueda/busquedaDestinos?destino";
  urlTarifas = this.urlLiga + "site/getTarifas";

  constructor(
    public http: HttpClient, 
    public alertCtrl:AlertController,
    public navCtrl: NavController) { }

    get(endpoint: string, params?: any, reqOpts?: any) {
      if (!reqOpts) {
        reqOpts = {
          params: new HttpParams()
        };
      }
      // Support easy query params for GET requests
      if (params) {
        reqOpts.params = new HttpParams();
        for (let k in params) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
      return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    postLogin(user,password) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/Login',('email='+user+'&password='+password), {
          headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
        })
        .subscribe(res => {
          resolve(res);
        }, async (err) => {          
          let alert = await this.alertCtrl.create({
            message: "Error de conexión",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: data => {
                }
              }
            ]
          });
          alert.present();
        });
      });
    }

    postReservation(email,password,id_agencia) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/Reservacion',('email='+email+'&password='+password+'&id_agencia='+id_agencia), {
          headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
        })
        .subscribe(res => {
          resolve(res);
        }, async (err) => {
          let alert = await this.alertCtrl.create({
            message: "Error de conexión",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
        });
      });
    }
    
    postAgenciaDesglose(email,password,id_agencia) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/AgenciaDesglose',('email='+email+'&password='+password+'&id_agencia='+id_agencia), {
          headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
        })
        .subscribe(res => {
          resolve(res);
        }, async (err) => {
          let alert = await this.alertCtrl.create({
            message: "No se obtuvieron los datos de la agencia.",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
        });
      });
    }

    /*getUsers(user,password) {
      return new Promise(resolve => {
        this.http.get(this.urlTarifas+'/?email='+user+'&password='+password).subscribe(data => {
          resolve(data);
        }, async err => {
          let alert = await this.alertCtrl.create({
            message: "Error de conexión",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
        });
      });
    }*/
}


