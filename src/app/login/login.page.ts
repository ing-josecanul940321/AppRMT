import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "@ionic/angular";
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ApiService } from '../provider/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  loader: any;
  player_id: any;

  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public api: ApiService,
    public loadCtrl: LoadingController,
    public translateService: TranslateService,
    private oneSignal: OneSignal) {

    this.menu.swipeEnable(false);
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ngOnInit() {
  }

  async doLogin(form) {
    this.loader = await this.loadCtrl.create();
    await this.loader.present();

    this.api.postLogin(form.value.email, form.value.password)
      .then(async data => {
        if (data.hasOwnProperty('0')) {
          localStorage.setItem("nombre_agencia", data[0].nombre_agencia);
          localStorage.setItem("id_reservacion", data[0].id_reservacion);
          localStorage.setItem("id_agencia", data[0].id_agencia);
          localStorage.setItem("id_usuario", data[0].id_usuario);
          localStorage.setItem("nombre_usuario", data[0].nombre_usuario);
          localStorage.setItem("email_usuario", data[0].email_usuario);
          localStorage.setItem("clave_usuario", data[0].clave_usuario);
          localStorage.setItem("datosAgencia", JSON.stringify(data[0]));

          this.oneSignal.getIds().then((id) => {
            this.player_id = id['userId'];
            this.api.http.post(this.api.url + '/AgregarOneSignal', ('id_agencia=' + data[0].id_agencia + '&id_usuario=' + data[0].id_usuario + '&player_id=' + this.player_id), {
              headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            })
              .subscribe(data => {
              }, err => {
              });
          });
          this.api.postAgenciaDesglose(localStorage.getItem("email_usuario"), localStorage.getItem("clave_usuario"), localStorage.getItem("id_agencia")).then((response) => {
            console.log(response["0"]);
            localStorage.setItem("AgenciaDesglose",JSON.stringify(response["0"]));
            this.loader.dismiss();
            this.navCtrl.navigateRoot("home");
          }).catch((err) => {
            console.log(err);
          });



        } else {

          let alert = await this.alertCtrl.create({
            message: "Usuario o Contraseña invalido.",
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
          this.loader.dismiss();
          alert.present();
        }
      });
  }


}
