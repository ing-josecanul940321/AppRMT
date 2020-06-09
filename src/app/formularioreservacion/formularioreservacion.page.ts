import { Component, OnInit } from '@angular/core';
import { BuscadorService } from '../provider/buscador.service';
import * as Moment from 'moment';
import { ApiService } from '../provider/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalBusquedaAgenciaPage } from '../modal-busqueda-agencia/modal-busqueda-agencia.page';
import { ModalcuponPage } from '../modalcupon/modalcupon.page';
import { AlertController } from '@ionic/angular';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-formularioreservacion',
  templateUrl: './formularioreservacion.page.html',
  styleUrls: ['./formularioreservacion.page.scss'],
})
export class FormularioreservacionPage implements OnInit {
  reservacion: { Agente; Agencia } = {
    Agente: '',
    Agencia: '',
  };

  usuario: { idUsuario: number; idAgencia: number; datosUsuario: any } = {
    idUsuario: localStorage.id_usuario,
    idAgencia: localStorage.id_agencia,
    datosUsuario: JSON.parse(localStorage.datosAgencia),
  };

  Reserva: any;
  Habitacion: any;
  model:any=[];

  Habitaciones: any = [];
  Adultos: any = [];
  Menores: any = [];
  showSpinner = 'hidden';
  disableButton = false;

  cupon:any;

  Tarifa;

  totalAdultos = 0;
  totalMenores = 0;

  FechaInicial;
  FechaFinal;
  FechaLimite;

  Agentes;
  Agencias;

  nombreAgencia;

  DatosApi = JSON.parse(localStorage.getItem('DatosApi'));

  condiciones=false;
  promociones:any;


  constructor(
    public buscador: BuscadorService,
    public api: ApiService,
    public modalcontroller: ModalController,
    public modalcuponcontroller: ModalController,
    public alertController: AlertController
  ) {
    this.AgenteRutaMaya();
    // this.DatosAgencia();
    this.nombreAgencia = this.usuario.datosUsuario.nombre_agencia;
    this.reservacion.Agencia = this.usuario.datosUsuario.id_agencia;

    this.Reserva = JSON.parse(this.buscador.datosReservacion);
    this.Tarifa = JSON.parse(localStorage.getItem('LocalTarifa'));
    this.promociones = this.Reserva.promociones !== null ? Base64.decode(this.Reserva.promociones) : '';
    // console.log(this.promociones);
    

    var countHab = 0;
    var tipoHabitaciones = [];
    if(this.Reserva.hotel.proveedor == '1' || this.Reserva.hotel.proveedor == '3'){
      var idHab = this.Reserva.datos[0].id_tipo_habitacion.trim(',');
      tipoHabitaciones = idHab.split(',');
      countHab = tipoHabitaciones.length;
      console.log(countHab);
      
    } 
    var i = Object.keys(this.Reserva.front_form.info_search).length;
    this.Habitacion = Object.keys(this.Reserva.front_form.info_search).map(
      (i) => this.Reserva.front_form.info_search[i]
    );

    this.FechaInicial = Moment(
      this.Reserva.resultadoBusquedaHoteles.fecha_inicial
    ).format('DD/MM/YYYY');
    this.FechaFinal = Moment(
      this.Reserva.resultadoBusquedaHoteles.fecha_final
    ).format('DD/MM/YYYY');
    this.FechaLimite = Moment(this.Reserva.model.fecha_limite).format(
      'DD/MM/YYYY'
    );

    for (let index = 0; index < this.Habitacion.length; index++) {
      for (let i = 0; i < this.Habitacion[index].adultos; i++) {
        this.Adultos.push({ n: i + 1, nombre: '', apellido: '' });
      }

      for (let i = 0; i < this.Habitacion[index].no_menores; i++) {
        this.Menores.push({
          n: i + 1,
          nombre: '',
          apellido: '',
          edad: parseInt(this.Habitacion[index].menores[i]),
        });
      }

      var idhab = this.Reserva.idhab;
      if(this.Reserva.hotel.proveedor == '3') {
        idhab= tipoHabitaciones[countHab-1]; 
      } else if (this.Reserva.hotel.proveedor == '1') {
        idhab= tipoHabitaciones[index];
      }

      var nombreHab = '';
      // if (this.Reserva.hotel.proveedor != '3' && this.Reserva.hotel.proveedor != '1') {
      //   nombreHab = this.Reserva.datos[0].tipo_habitacion;
      // }else{
        var habitacionesForm = this.Reserva.tipo_habitacion;
        habitacionesForm.forEach(name => {
          if (idhab == name.id_tipo_habitacion) {
            nombreHab = name.tipo_habitacion;
          }
        });
        // console.log(idhab);
        // console.log(nombreHab);
        
      // }

      let offers = []; let rateComments = '';
      if(this.Reserva.offers != null){
         offers = this.Reserva.offers[index];
      }
      
      if (this.Reserva.rateComments != null) {
        rateComments = this.Reserva.rateComments[index];
      }
      this.Habitaciones.push({ 
        Adultos: this.Adultos, 
        Menores: this.Menores, 
        nombreHabitacion: nombreHab, 
        idhab: idhab,
        offers: offers,
        rateComments: rateComments
      });
      this.Adultos = [];
      this.Menores = [];
      
      this.totalAdultos += parseInt(this.Habitacion[index].adultos);
      this.totalMenores += parseInt(this.Habitacion[index].no_menores);
    }
    // console.log(this.Habitaciones);
    
  }

  parseOffer(amount: string){
    let precio = parseFloat(amount) / parseFloat(this.Reserva.markup);
    return precio.toFixed(2);
  }

  AgenteRutaMaya() {
    this.api.http
      .post(
        this.api.urlTest + 'agencias/getAgenteMovil',
        'id_estado=' +
          this.usuario.datosUsuario.id_estado_agencia +
          '&id_agencia=' +
          localStorage.id_agencia +
          '&tipoUsuario=' +
          this.usuario.datosUsuario.tipo_usuario,
        {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          ),
        }
      )
      .subscribe(
        (data) => {
          this.Agentes = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async DatosAgencia() {
    const modal = await this.modalcontroller.create({
      component: ModalBusquedaAgenciaPage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null || typeof dataReturned !== undefined) {
        this.reservacion.Agencia = dataReturned.data.id_agencia;
        this.nombreAgencia = dataReturned.data.nombre_agencia;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  async modalCupon() {
    const modal = await this.modalcuponcontroller.create({
      component: ModalcuponPage,
      componentProps: {
        cupon: this.cupon,
        log: Moment().format('DD/MM/YYYY'),
        total: this.formatoPrecio(this.Reserva.model.total),        
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }

  ngOnInit() {}

  formatoPrecio(cant_dinero) {
    let val = (cant_dinero / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  postReservar(form) {
    // var HabitacionPost = {};
    var AdultoPost = {};
    var NinioPost = {};
    var rateKey = '';
    this.showSpinner = '';
    this.disableButton = true;
    
    this.model = this.Reserva.model;
    this.model.plan = this.Reserva.datos_generales.tipo_plan;
    this.model.id_agente = form.value.Agente;
    this.model.id_agencia = this.reservacion.Agencia;
    this.model.nombre_cliente = this.Habitaciones[0].Adultos[0].nombre;
    this.model.apellido_cliente = this.Habitaciones[0].Adultos[0].apellido;
    this.model.id_usuario = this.usuario.idUsuario;
    this.model.moneda = this.Reserva.datos_generales.moneda;
    if (this.model.id_tipo_plan === null) {
      this.model.id_tipo_plan = this.DatosApi.id_plan;
    }
    this.model.tarifa_neta = this.Reserva.datos[0].tarifa_neta !== '' ? this.Reserva.datos[0].tarifa_neta : this.Reserva.datos[0].total_neto;
    this.model.id_bloqueo = '';
    this.model.code = '';
    
    const postData = new FormData();
    for (var prop in this.model) {
      if (this.model.hasOwnProperty(prop)) {
        if (this.model[prop] !== null) {
          // console.log(this.model[prop]);
          postData.append('Reservacion[' + prop + ']', this.model[prop]);
        }
      }
    }
    // postData.append('Reservacion', JSON.stringify(this.model));
    postData.append('proveedor_hotel', this.Reserva.hotel.proveedor);
    postData.append('condiciones', '1');
    postData.append('tipo_pago', '1');
    postData.append('id_cupon_aplicado', '');
    postData.append('cupon_agencia', '');
    postData.append('referencia', '');
    if (this.Reserva.hotel.proveedor !== '0') {
      rateKey = this.Reserva.datos[0].rateKey;
    }
    postData.append('rateKey', rateKey);
    postData.append('carrito', '0');
    postData.append('total_adultos', this.totalAdultos.toString());
    postData.append('total_menores', this.totalMenores.toString());
    postData.append('datos', JSON.stringify(this.Reserva.datos[0]));
    
    if(this.promociones !== ''){
      postData.append('promociones', this.Reserva.promociones);
    }
    
    for (let index = 0; index < this.Habitaciones.length; index++) {

      postData.append('Habitacion_' + (index+1) + '[id_tipo_habitacion]', this.Reserva.idhab);
      postData.append('Habitacion_' + (index+1) + '[id_base_habitacion]', this.Habitaciones[index].Adultos.length);
      postData.append('Habitacion_' + (index+1) + '[num_adultos]', this.Habitaciones[index].Adultos.length);
      postData.append('Habitacion_' + (index+1) + '[num_ninios]', this.Habitaciones[index].Menores.length);

      for (let i = 0; i < this.Habitaciones[index].Adultos.length; i++) {
        var nombreAdultos = 'Adulto_' + (i + 1) + '_' + (index + 1) + '[nombre]';
        var apellidoAdultos = 'Adulto_' + (i + 1) + '_' + (index + 1) + '[apellido]';
        
        AdultoPost[nombreAdultos] = this.Habitaciones[index].Adultos[i].apellido;
        AdultoPost[apellidoAdultos] = this.Habitaciones[index].Adultos[i].nombre;

        postData.append(nombreAdultos, this.Habitaciones[index].Adultos[i].apellido);
        postData.append(apellidoAdultos, this.Habitaciones[index].Adultos[i].nombre);
      }

      for (let i = 0; i < this.Habitaciones[index].Menores.length; i++) {

        var nombreNinio = 'Ninio_' + (i + 1) + '_' + (index + 1) + '[nombre]';
        var apellidoNinio = 'Ninio_' + (i + 1) + '_' + (index + 1) + '[apellido]';
        var edadNinio = 'Ninio_' + (i + 1) + '_' + (index + 1) + '[edad]';
        
        NinioPost[nombreNinio] = this.Habitaciones[index].Menores[i].nombre;
        NinioPost[apellidoNinio] = this.Habitaciones[index].Menores[i].apellido;
        NinioPost[edadNinio] = parseInt(this.Habitacion[index].menores[i]);
        
        postData.append(nombreNinio, this.Habitaciones[index].Menores[i].nombre);
        postData.append(apellidoNinio, this.Habitaciones[index].Menores[i].apellido);
        postData.append(edadNinio, this.Habitacion[index].menores[i]);
      }

      if (this.Habitaciones[index].offers.length > 0) {
        postData.append('offers_' + (index + 1), this.Habitaciones[index].offers);
      }

      if (this.Habitaciones[index].rateComments != '') {
        postData.append('rateComments_' + (index + 1), this.Habitaciones[index].rateComments);
      }
      
    }
    postData.append('movil', '1');
    var cotizacion = encodeURIComponent(JSON.stringify(this.Reserva.cotizacion));
    var totalCotiz = encodeURIComponent(JSON.stringify(this.Reserva.totalCotiz));
    
    var reg = /(\.|\-)/g;
    let mensaje = '';

    // console.log(this.condiciones);
    
    if (this.condiciones === false) {
      mensaje = 'Por favor, acepta los terminos y condiciones de la reserva.';
    }
    if(this.Reserva.datos[0].rateKey != '') {
      var num_hab=parseInt(this.model.num_habitaciones);
      for (var hab = 1; hab <= num_hab; hab++) {
        var num_adultos= this.Habitaciones[hab-1].Adultos.length;
        for (var i = 0; i < num_adultos; i++) {
          
          if(this.Habitaciones[hab-1].Adultos[i].apellido === '' || this.Habitaciones[hab-1].Adultos[i].nombre === '') {
            mensaje = 'El nombre y apellido de los adultos son requeridos.';
          }

          if (reg.test(this.Habitaciones[hab-1].Adultos[i].apellido) === true || reg.test(this.Habitaciones[hab-1].Adultos[i].nombre) === true) {
            mensaje = 'El nombre y/o apellido contiene caracteres no permitidos.';
          }

        }
      }
    }

    if (this.model.id_agencia == '' || this.model.id_agente == '' || this.model.nombre_cliente == '' || this.model.apellido_cliente == '') {
      mensaje = 'Por favor, complete los campos requeridos';
    }

    if (reg.test(this.model.nombre_cliente) == true || reg.test(this.model.apellido_cliente) == true) {
      mensaje = 'El nombre y/o apellido contiene caracteres no permitidos.';
    }
    
    if(mensaje === ''){
      
      this.api.http
      .post(
        this.api.urlTest + 'reservacion/guardarBooking/?cotizacion=' + cotizacion + '&totalCotiz=' + totalCotiz,
        postData
        )
        .subscribe(
          (data) => {
            this.showSpinner = 'hidden';
            this.disableButton = false;
            if(data['cupon'] != null) {
              this.cupon = data['cupon'];
              this.modalCupon();
              // console.log(data['cupon']);
            }else{
              let mensaje = 'HUBO UN ERROR AL INTENTAR CREAR SU RESERVACIÓN! FAVOR DE CONTACTAR A RUTA MAYA TRAVEL.';
              this.presentAlert(mensaje);
            }
        },
        (error) => {
          console.log(error);
        }
      );

    }else{
      this.presentAlert(mensaje);
      this.showSpinner = 'hidden';
      this.disableButton = false;
    }
    
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
