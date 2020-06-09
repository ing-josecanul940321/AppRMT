import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detallereservacion',
  templateUrl: './detallereservacion.page.html',
  styleUrls: ['./detallereservacion.page.scss'],
})
export class DetallereservacionPage implements OnInit {

  usuario: { idUsuario: number, idAgencia: number,datosUsuario:any } = {
    idUsuario: localStorage.id_usuario,
    idAgencia: localStorage.id_agencia,
    datosUsuario: JSON.parse(localStorage.datosAgencia)
  };

  Detalles:any;
  Reservacion:any;
  constructor(private activatedRoute: ActivatedRoute,public navCtrl: NavController) {
    this.Detalles = JSON.parse(this.activatedRoute.snapshot.paramMap.get('Detalles'));
    this.Reservacion = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));


    console.log(this.Reservacion);
   }

  ngOnInit() {
  }

  /*openPago()
  {
    this.navCtrl.navigateForward("PagoPage", {
      reservacion: this.Reservacion,
      });
  }*/

}
