import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiService } from '../provider/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-modalcupon',
  templateUrl: './modalcupon.page.html',
  styleUrls: ['./modalcupon.page.scss'],
})
export class ModalcuponPage {

  @Input() cupon;
  @Input() log;
  @Input() total;

  showSpinner = 'hidden';

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    public api:ApiService,
  ) { }

  async closeModal() {
    this.openReservacion();
  }

  async salirModal(){
    await this.modalController.dismiss()
  }

  openReservacion() {
    this.showSpinner = '';
    this.api.http.get(this.api.urlTest+'reservacion/reservacionDesgloseMovil?id=' + this.cupon)
    .subscribe(response => {

      this.api.http.post(this.api.url+'/ReservacionDesglose',('email='+localStorage.email_usuario+'&password='+localStorage.clave_usuario+'&id_reservacion='+this.cupon), {
        headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
      })
      .subscribe(data => {
        this.showSpinner = 'hidden';
        this.navCtrl.navigateForward(['detallereservacion/'+this.cupon, {Detalles:JSON.stringify(data[0]),item:JSON.stringify(response[0]) }]);
        this.salirModal();
        }, err => {
          console.log(err);
      });


      }, err => {
        console.log(err);
    });
  }

}
