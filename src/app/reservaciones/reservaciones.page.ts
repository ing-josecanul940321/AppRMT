import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiService } from '../provider/api.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {

  items:any;
  reservaciones:any;
  reservacionDesglose:any;
  loader:any;

  constructor(
    public navCtrl: NavController,
    public api:ApiService,
    public loadCtrl:LoadingController,
    ){  
      this.postReservation();
      this.initializeItems();
  }

  ngOnInit() {
  }  
  
  initializeItems()
  {
    this.items=this.reservaciones;
    console.log(this.reservaciones)
  }

  async postReservation(){
    this.loader = await this.loadCtrl.create({
      message: 'Espere por favor...',
    });
    await this.loader.present();
    this.api.postReservation(localStorage.email_usuario,localStorage.clave_usuario,localStorage.id_agencia)
    .then(data=> {
      this.reservaciones=data;
      this.loader.dismiss();
      this.initializeItems();     
    });
   }

   async openReservacion(item) {
    this.loader = await this.loadCtrl.create({
      message: 'Cargando reservación...',
    });
    await this.loader.present();
    this.api.http.post(this.api.url+'/ReservacionDesglose',('email='+localStorage.email_usuario+'&password='+localStorage.clave_usuario+'&id_reservacion='+item.id_reservacion), {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
    })
    .subscribe(data => {
      this.loader.dismiss();
      this.navCtrl.navigateForward(['detallereservacion/'+item["id_reservacion"], {Detalles:JSON.stringify(data[0]),item:JSON.stringify(item) }]);
      }, err => {
        console.log(err);
      });
    } 

  //FILTRO DE BUSQUEDA
  buscarCliente(en: any)
  {
    this.initializeItems();
    let val =en.target.value;
    if(val&& val.trim()!=''){
      this.items=this.items.filter((item)=>{
        return(item.nombre_cliente.toLowerCase().indexOf(val.toLowerCase())> -1);
      })
    }
  }
}
