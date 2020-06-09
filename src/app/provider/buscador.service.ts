import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  HotelDestino:any;
  HistorialHotelDestino:any=[];

  Fechas:any;

  Habitaciones:any=[{Habitacion:1}];
  Habitacion:any=[/*{'adultos':2,'num_ninios':0}*/];

  Adultos:any=2;
  Menores:any=0;
  Adulto:any;
  Menor:any;

  Edades:any=[{Edad:1}];
  Edad:any=[];  

  Tarifas:any;

  codigo:any='U'+localStorage.getItem('id_usuario')+'A'+localStorage.getItem('id_agencia');

  urls;

  front_form:any;
  habitacionesRQ:any;

  datosReservacion:any;

  constructor() { }
}
