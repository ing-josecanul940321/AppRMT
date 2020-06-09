import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from '../provider/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetalletarifaPage } from '../detalletarifa/detalletarifa.page';
import { BuscadorService } from '../provider/buscador.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.page.html',
  styleUrls: ['./tarifas.page.scss'],
})
export class TarifasPage implements OnInit {

  items:any;
  tarifas:any;
  number:any;
  Conexiones:any;
  idAgencia:any=localStorage.id_agencia;
  numHoteles;
  ocultar='';
  numAdultos:any=0;
  numMenores:any=0;
 
  constructor(public api:ApiService,
    public buscador:BuscadorService,
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    public modalCtrl: ModalController) { 
      this.initializeItems();
    //this.tarifas = JSON.parse(this.activatedRoute.snapshot.paramMap.get('tarifas'));
  
    /*this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {        
       return this.router.getCurrentNavigation().extras.state.tarifas;       
      }      
    });*/     
    
  }

  async openTarifa(tarifa)
  { 
    var Habita = Object.keys(tarifa.Habitaciones).map(i => tarifa.Habitaciones[i])

    for (let i = 0; i < Habita.length; i++) {
      var planes = Habita[i].Planes;
      planes = Object.keys(planes).map(m => planes[m]);
      Habita[i].Planes=planes;

      for (let p = 0; p < Habita[i].Planes.length; p++) {
        var planTarifa = Habita[i].Planes[p].plan;
        planTarifa = Object.keys(planTarifa).map(r => planTarifa[r]);
        Habita[i].Planes[p].plan=planTarifa;
      }
    
    }
    console.log(Habita);
    
    localStorage.setItem('Proveedor',tarifa.proveedor);

    localStorage.setItem('LocalTarifa', JSON.stringify(tarifa))
      
    let starHotel = [];
    if (typeof tarifa.estrellas === 'number') {
      for (let i = 1; i <= tarifa.estrellas; i++) {
        starHotel.push(i);
      }
    }else{
      starHotel = tarifa.estrellas;
    }
    console.log(Habita);
    
    const ModalHabitacion = await this.modalCtrl.create({
      component:DetalletarifaPage,
      componentProps:{
        NombreHotel:tarifa.nombre_hotel,
        Descripcion:tarifa.observaciones,
        Proveedor:tarifa.proveedor,
        Habitacion:Habita,
        estrellas:starHotel
      }
    });

    await ModalHabitacion.present();
  }


  async openTarifaDO(tarifa)
  {    
    // console.log(this.buscador.front_form)
        
    this.api.http.post(this.api.urlLiga+'TravelSolution/TarifasAsur3',('front_form='+JSON.stringify(this.buscador.front_form)+'&idHotel='+tarifa.id_hotel+'&fecha_inicial='+this.buscador.front_form.fecha_ini+'&codigoHotel='+tarifa.code_hotel+'&interfaceInfo='+tarifa.destino.datos_search), {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
    })
    .subscribe(async data => {

      // console.log(data[tarifa.id_hotel].Habitaciones);

      var Habita = Object.keys(data[tarifa.id_hotel].Habitaciones).map(i => data[tarifa.id_hotel].Habitaciones[i])

      for (let i = 0; i < Habita.length; i++) {
        var planes = Habita[i].Planes;
        planes = Object.keys(planes).map(i => planes[i]);
        Habita[i].Planes=planes;
      }
      localStorage.setItem('Proveedor',tarifa.proveedor);

      localStorage.setItem('LocalTarifa', JSON.stringify(tarifa))

      let starHotel = [];
      if (typeof tarifa.estrellas === 'number') {
        for (let i = 1; i <= tarifa.estrellas; i++) {
          starHotel.push(i);
        }
      }else{
        starHotel = tarifa.estrellas;
      }
      
      const ModalHabitacion = await this.modalCtrl.create({
        component:DetalletarifaPage,
        componentProps:{
          NombreHotel:tarifa.nombre_hotel,
          Descripcion:tarifa.observaciones,
          Proveedor:tarifa.proveedor,
          Habitacion:Habita,
          estrellas:starHotel
        }
      });

      await ModalHabitacion.present();
  
  }, err => {
      console.log(err);
    });
    
  }

  ngOnInit() {
    
  }

  initializeItems()
  {
    let habs = parseInt(this.buscador.front_form.habs);

    for (let i = 1; i <= habs; i++) {
      this.numAdultos = this.numAdultos + parseInt(this.buscador.front_form['habitacion_' + i].adultos);
      this.numMenores = this.numMenores + parseInt(this.buscador.front_form['habitacion_' + i].num_ninios);
    }
    this.items = JSON.parse(this.buscador.Tarifas);     
    this.tarifas=Object.keys(this.items).map(i => this.items[i]);

    this.tarifas= this.tarifas.sort((a,b) => 
    parseFloat(a.Desglose.moneda == 'USD' ? a.Desglose.menorPrecio_mxn : a.Desglose.menorPrecio) - parseFloat(b.Desglose.moneda == 'USD' ? b.Desglose.menorPrecio_mxn : b.Desglose.menorPrecio)
    ); 

    this.numHoteles = this.tarifas.length;
  }
  

  buscarHotel(en: any)
  {
    this.initializeItems();

    let val =en.target.value;
    if(val&& val.trim()!=''){
      this.tarifas=this.tarifas.filter((tarifa)=>{
        this.ocultar = '1';
        return(tarifa.nombre_hotel.toLowerCase().indexOf(val.toLowerCase())> -1);
      })
    }
    else
    {
      this.ocultar = '';
    }
  }
}
