import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController  } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../provider/api.service';
import { BuscadorService } from '../provider/buscador.service';
import { HttpHeaders } from '@angular/common/http';
import { TarifasPage } from '../tarifas/tarifas.page';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  dDate: Date = new Date();
  searchQuery: string = '';
  items: string[];
  showItems: boolean = false;

  public map: any;
  public childs: any;

  public hotellocation: string;

  // list of hotels
  public hotels: any;

  // search conditions
  public checkin = {
    name: "Check-in",
    date: this.dDate.toISOString()
  }

  public checkout = {
    name: "Check-out",
    date: new Date(this.dDate.setDate(this.dDate.getDate() + 1)).toISOString()
  }
  
  nAdultos:any;
  nNinios:any;
  data:any;
  ArregloHabitacion:any=[];
  array:any;
  loader:any;
  
  constructor(
    public buscador:BuscadorService,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public api: ApiService,
    public modalCtrl: ModalController,
    private router: Router,
    public loadCtrl:LoadingController,
    public alertCtrl: AlertController
    ) {
      //this.HotelDestino = this.activatedRoute.snapshot.paramMap.get('HotelDestino');
      //this.Habitacion = this.activatedRoute.snapshot.paramMap.get('Habitacion'); 
      
  }
  ngOnInit() {
  }

  ionViewWillEnter()
  {
    if(this.buscador.Habitacion.length == 0)
    {
      this.buscador.Habitacion.push({'adultos':2,'num_ninios':0});
    }

    this.buscador.HotelDestino = localStorage.getItem('HotelDestinoNombre');

    

    if(localStorage.getItem('FechaInicio')==null && localStorage.getItem('FechaFin')==null)
    {
      this.buscador.Fechas = '';
    }
    else
    {
      this.buscador.Fechas = localStorage.getItem('FechaInicio') + " - " + localStorage.getItem('FechaFin');
    }
  }

  dataName(id){
 
      const load=this.buscador.Habitacion[id-1]?true:false;

      if(load===true)
      { 
        this.data=`${this.buscador.Habitacion[id-1].adultos} Adultos - ${this.buscador.Habitacion[id-1].num_ninios} Menores`;
      }
      return this.data;

  }

  openHotelDestino(){
    this.navCtrl.navigateForward("hotelesdestino");
  }

  openCalendario(){  
    this.navCtrl.navigateForward("calendario");
  }

  openHabitacion(habita)
  {
    const load=this.buscador.Habitacion[habita-1]?true:false;

    if(load===true)
    { 
      this.nAdultos=this.buscador.Habitacion[habita-1].adultos;
      this.nNinios=this.buscador.Habitacion[habita-1].num_ninios;
    }
    else
    {
      this.nAdultos = 2;
      this.nNinios = 0;
    }

    var Detalles = [{
      nId:habita,
      nAdultos:this.nAdultos,
      nNinios:this.nNinios
    }]

    this.navCtrl.navigateForward(["habitacion/"+habita,{ Detalles:JSON.stringify(Detalles[0])}]);
  }

  quitarHabitacion(id)
  {
    if(this.buscador.Habitaciones.length != 1)
    {
      const i = id - 1;
      this.buscador.Habitacion.splice(i,1);
      this.buscador.Habitaciones.pop();
    }    
  }

  nuevaHabitacion()
  {
    if(this.buscador.Habitaciones.length < 5)
    {
      this.buscador.Habitaciones.push({'Habitacion':this.buscador.Habitaciones.length + 1});
      this.buscador.Habitacion.push({'adultos':2,'num_ninios':0});
    }    
  }

  async Buscar()
  {
    this.loader = await this.loadCtrl.create();
    await this.loader.present();

    if(localStorage.getItem('HotelDestinoCodigo') != null)
    {   
    
    this.array = {
      filtro_disponibilidad:1,
      destino:localStorage.getItem('HotelDestinoCodigo'),
      fecha_entrada:localStorage.getItem('FechaInicio'),
      fecha_salida:localStorage.getItem('FechaFin'),
      habs:this.buscador.Habitaciones.length
    };
    this.buscador.urls="";

    for (let index = 0; index < this.buscador.Habitacion.length; index++) {   
      
      this.buscador.urls+="&habitacion_"+(index+1)+"[adultos]="+this.buscador.Habitacion[index]['adultos'];
      this.buscador.urls+="&habitacion_"+(index+1)+"[num_ninios]="+this.buscador.Habitacion[index]['num_ninios'];

      if(this.buscador.Habitacion[index]['edades'] != undefined){
        for(let i = 0; i < this.buscador.Habitacion[index]['edades'].length; i++ ){
          // this.buscador.Habitacion[index]['edad_'+(i+1)]=this.buscador.Habitacion[index]['edades'][i]['Edad'];
          this.buscador.urls+="&habitacion_"+(index+1)+"[edad_"+(i+1)+"]="+this.buscador.Habitacion[index]['edades'][i]['Edad'];
         }
      }  

     // delete this.buscador.Habitacion[index]['edades'];
     // this.array["habitacion_"+(index+1)] = this.buscador.Habitacion[index]; 
    }      

    return new Promise(resolve => {
        this.api.http.get(this.api.urlTarifas + '/getTarifas/?filtro_disponibilidad=1&destino='+localStorage.getItem('HotelDestinoCodigo')+"&fecha_entrada="+localStorage.getItem('FechaInicio')+"&fecha_salida="+localStorage.getItem('FechaFin')+"&habs="+this.buscador.Habitaciones.length+this.buscador.urls+'&keyU='+localStorage.getItem('id_usuario')).subscribe(async data => {
          resolve(data);

          /*let navigationExtras: NavigationExtras = {
            state: {
              tarifas: data['row']
            }
          };*/
          //this.router.navigate(['tarifas'], navigationExtras);



          //localStorage.setItem('Tarifas',JSON.stringify(data['row']));
          this.buscador.Tarifas = JSON.stringify(data['row']);
          this.buscador.front_form = data['front_form'];
          this.buscador.habitacionesRQ = data['habitacionesRQ'];

          this.navCtrl.navigateForward('tarifas');
          this.loader.dismiss();
          console.log(this.buscador);
          


          //this.navCtrl.navigateForward(['tarifas',{tarifas:JSON.stringify(data)}]);
          //this.navCtrl.navigateForward('tarifas');

        }, async err => {
          

          this.loader.dismiss();
          let alert = await this.alertCtrl.create({
            message: "No se ha podido realizar la búsqueda.",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                handler: data => {
                  console.log(err);
                }
              }
            ]
          });
          alert.present();
          //console.log(this.api.urlTarifas+'?filtro_disponibilidad=1&destino='+localStorage.getItem('HotelDestinoCodigo')+"&fecha_entrada="+localStorage.getItem('FechaInicio')+"&fecha_salida="+localStorage.getItem('FechaFin')+"&habs="+this.buscador.Habitaciones.length+urls);
        });
      });
    }
    else{
      this.loader.dismiss();
      let alert = await this.alertCtrl.create({
        message: "Seleccione el destino deseado.",
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
          }
        ]
      });
      alert.present();
    }



    //console.log(this.array);
  }

  /*async openHabitacion(){
    const ModalHabitacion = await this.modalCtrl.create({
      component:HabitacionPage,
      componentProps:{
        Adultos:1,
        Menores:0
      }
    });

    await ModalHabitacion.present();

    const {data}=await ModalHabitacion.onDidDismiss();
    console.log(data);   

    
  }*/
}
