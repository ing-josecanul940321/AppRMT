import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { DetallehabitacionPage } from '../detallehabitacion/detallehabitacion.page';
import { ApiService } from '../provider/api.service';
import { BuscadorService } from '../provider/buscador.service';
import * as Moment from 'moment';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-detalletarifa',
  templateUrl: './detalletarifa.page.html',
  styleUrls: ['./detalletarifa.page.scss'],
})
export class DetalletarifaPage implements OnInit {
  @Input() Habitacion;
  @Input() NombreHotel;
  @Input() Descripcion;
  @Input() Proveedor;
  @Input() estrellas;

  idAgencia: any = localStorage.id_agencia;
  ocultar: any = 'hidden';
  arrowVer: any = '';
  datos_generales: any = [];
  datos_api: any = [];
  input_front_form: any = [];
  input_resultado_busqueda: any = [];
  startProcess: any;
  roomRates: any = '';
  RoomRates: any = '';
  loader:any;

  constructor(
    public modalCtrl: ModalController,
    public buscador: BuscadorService,
    public navCtrl: NavController,
    public api: ApiService,
    public alertController: AlertController,
    public loadCtrl:LoadingController,
  ) {}

  ngOnInit() {}

  ocult() {
    this.ocultar = 'hidden';
    this.arrowVer = '';
  }
  ver() {
    this.ocultar = '';
    this.arrowVer = 'hidden';
  }

  salirModal() {
    this.modalCtrl.dismiss();
  }

  async openHabitacion(plan) {
    var i = Object.keys(plan.calendario.habitacion).length;

    var Habitacion = Object.keys(plan.calendario.habitacion).map(
      (i) => plan.calendario.habitacion[i]
    );
    // console.log(Habitacion)
    for (let i = 0; i < Habitacion.length; i++) {
      var fechas = Habitacion[i].Fechas;
      fechas = Object.keys(fechas).map((i) => fechas[i]);
      Habitacion[i].Fechas = fechas;
    }

    var Politicas = plan.politicas_cancelacion;
    var Promocion: any;

    if (plan.promociones) {
      Promocion = Object.keys(plan.promociones).map((i) => plan.promociones[i]);
    }

    const ModalHabitacion = await this.modalCtrl.create({
      component: DetallehabitacionPage,
      componentProps: {
        Plan: plan,
        Habitaciones: Habitacion,
        Promocion: Promocion,
        Politicas: Object.keys(Politicas).map((i) => Politicas[i]),
      },
    });

    // console.log(Habitacion)
    await ModalHabitacion.present();
  }

  typeof(parameter) {
    let type = typeof parameter;
    // console.log(type);

    return type;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Upsss',
      message: 'Ocurrió un error inesperado',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async postReservar(Plan) {
    try {
      this.loader = await this.loadCtrl.create();
      await this.loader.present();
      
      var LocalTarifa = JSON.parse(localStorage.getItem('LocalTarifa'));

      /*var FechaI=Moment(localStorage.getItem('FechaInicio'), 'DD/MM/YYYY').format('YYYY-MM-DD');
      var FechaF=Moment(localStorage.getItem('FechaFin'), 'DD/MM/YYYY').format('YYYY-MM-DD');*/

      this.Proveedor = LocalTarifa.proveedor;
      this.input_front_form = this.buscador.front_form;
      this.input_resultado_busqueda = this.buscador.habitacionesRQ;
      this.startProcess = Moment().format('HH:mm:ss');

      if (this.Proveedor == 2) {
        this.roomRates = LocalTarifa.Desglose.roomRates;
        this.RoomRates = Base64.encode(JSON.stringify(this.roomRates));
      } else if (this.Proveedor == 3) {
        this.roomRates = LocalTarifa.destino.datos_search;
        this.RoomRates = this.roomRates;
      }

      this.datos_api = Plan.plan;
      this.datos_generales = {
        id_hotel: LocalTarifa.id_hotel,
        nombre_hotel: LocalTarifa.nombre_hotel,
        id_plan: Plan.id_plan,
        tipo_plan: Plan.plan[0].tipo_plan,
        code_hotel: LocalTarifa.code_hotel,
        id_habitacion: Plan.id_habitacion,
        precio: this.convertToNumber(Plan.plan[0].precio),
        moneda: Plan.plan[0].moneda,
        id_tarifa: Plan.plan[0].tarifa,
        markup: LocalTarifa.markup,
      };

      if (parseInt(this.buscador.front_form.habs) > 1) {
        if (this.Proveedor == 2 || this.Proveedor == 4 || this.Proveedor == 5) {
          this.datos_api = Plan.Total_planes;
          // console.log('DATOS API');
          // console.log(this.datos_api);
          this.datos_generales = {
            id_hotel: LocalTarifa.id_hotel,
            nombre_hotel: LocalTarifa.nombre_hotel,
            id_plan: Plan.id_plan,
            tipo_plan: Plan.Total_planes.tipo_plan,
            code_hotel: LocalTarifa.code_hotel,
            id_habitacion: Plan.id_habitacion,
            precio: this.convertToNumber(Plan.Total_planes.precio),
            moneda: Plan.Total_planes.moneda,
            id_tarifa: 0,
            markup: LocalTarifa.markup,
          };
        }else{
          this.datos_api = this.datos_api;
        }
      }

      localStorage.setItem('DatosApi', JSON.stringify(this.datos_api));
      console.log(this.datos_api);
      
      const postData = new FormData();
      postData.append(
        'datos_generales',
        Base64.encode(JSON.stringify(this.datos_generales))
      );
      postData.append(
        'input_resultado_busqueda',
        Base64.encode(JSON.stringify(this.input_resultado_busqueda))
      );
      postData.append(
        'datos_api',
        Base64.encode(JSON.stringify(this.datos_api))
      );
      postData.append(
        'input_front_form',
        Base64.encode(JSON.stringify(this.input_front_form))
      );
      postData.append('proveedor', LocalTarifa.proveedor);
      postData.append('startProcess', this.startProcess);
      postData.append('roomRates', this.RoomRates);
      postData.append('id_usuario', localStorage.getItem('id_usuario'));
      
      return new Promise(resolve => {
        this.api.http
        .post(this.api.urlTest + 'reservacionMovil/createReservacion', postData)
        .subscribe(async data => {
          resolve(data);
          
            this.buscador.datosReservacion = JSON.stringify(data);
            this.loader.dismiss();
            this.navCtrl.navigateForward('formularioreservacion');
            this.salirModal();

        }, async err => {
          this.loader.dismiss();
          this.presentAlert();
          console.log(err);
        });
      });
    } catch (error) {
      this.presentAlert();
    }
  }

  convertToNumber(numero) {
    if (typeof numero.replace(',', '') == undefined) {
      var number = numero;
    } else {
      var number = numero.replace(',', '');
    }
    return parseFloat(number);
  }

  /*postReserva(Plan)
  {   
    Plan = Object.keys(Plan).map(key => ({type: key, value: Plan[key]}));

    console.log(Plan);
    console.log(Plan[9].value[0].roomrates);
    console.log(Plan[9].value[0].rateKey);

    console.log(Plan[9].value[0].ratePlan);
    console.log(Plan[9].value[0].roomType);

    console.log(Plan[9].value[0].tarifadiaria);
    console.log(Plan[9].value[0].hab);
  }*/
}
