import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, AlertController  } from '@ionic/angular';
import { BuscadorService } from '../provider/buscador.service';
import { ActivatedRoute } from '@angular/router';
import { format } from 'url';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
})
export class HabitacionPage implements OnInit {

  Detalles:any

  Edad:any;

  constructor(public buscador: BuscadorService,
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public alertCtrl:AlertController,
    private activatedRoute: ActivatedRoute) {

    this.Detalles = JSON.parse(this.activatedRoute.snapshot.paramMap.get('Detalles'));     
    
  }

  ngOnInit() {         
  }

  ionViewWillEnter()
  {
    this.buscador.Adultos=2;
    this.buscador.Menores=0;    
    this.buscador.Adulto=this.Detalles.nAdultos;
    this.buscador.Menor=this.Detalles.nNinios;
    this.buscador.Edades=[];

    if(this.Detalles.nNinios > 0)
    {     
      var i = this.Detalles.nId-1;
      for (let index=0 ; index < this.Detalles.nNinios; index++) {        
        this.buscador.Edades.push({'Edad':this.buscador.Edad[i][index]['Edad']});   
      }
    }
  }

  addAdulto()
  {
    if(this.Detalles.nAdultos >=1 && this.Detalles.nAdultos < 8)
    {
      this.buscador.Adulto = this.Detalles.nAdultos + 1;
      this.Detalles.nAdultos = this.buscador.Adulto;
    }    
  }

  rmAdulto()
  {
    if(this.Detalles.nAdultos >= 2)
    {
      this.buscador.Adulto = this.Detalles.nAdultos - 1;
      this.Detalles.nAdultos = this.buscador.Adulto;
    }    
  }

  addMenor()
  {
    if(this.Detalles.nNinios >=0 && this.Detalles.nNinios < 5)
    {
      this.buscador.Menor = this.Detalles.nNinios + 1;
      this.Detalles.nNinios = this.buscador.Menor;
      this.addEdad();
    }
  }

  rmMenor()
  {
    this.rmEdad();

    if(this.Detalles.nNinios >= 1)
    {
      this.buscador.Menor = this.Detalles.nNinios - 1;
      this.Detalles.nNinios = this.buscador.Menor;
    }
  }

  addEdad()
  {
    this.buscador.Edades.push({'Edad':''});
  }

  rmEdad()
  {
    this.buscador.Edades.pop();
  }

  ValidarEdades()
  {
    for (let index = 0; index < this.buscador.Edades.length; index++) {

      if(this.buscador.Edades[index]['Edad'] == '')
      {
        return true;
      }            
    }
    return false;
  }

  async postHabitacion()
  {   
    if(this.buscador.Menor == undefined || this.buscador.Adulto == undefined )
    {
      this.buscador.Menor = this.Detalles.nNinios;
      this.buscador.Adulto = this.Detalles.nAdultos;
    } 

    if(this.ValidarEdades() == true)
    {
      let alert = await this.alertCtrl.create({
        message: 'Campos de edad requeridos.',
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
    }
    else
    {
      if(this.buscador.Habitacion.length > 0)
      {   
        for (let index = 0; index < this.buscador.Habitacion.length; index++) {
          const posicion= index+1;
          
          if(this.Detalles.nId == posicion)
          {            
            if(this.Detalles.nNinios > 0)
            {              
              this.buscador.Habitacion.splice(index,1,{'adultos':this.buscador.Adulto, 'num_ninios':this.buscador.Menor,'edades':this.buscador.Edades})              
            }
            else{              
              this.buscador.Habitacion.splice(index,1,{'adultos':this.buscador.Adulto, 'num_ninios':this.buscador.Menor});
            } 

            this.buscador.Edad.splice(this.Detalles.nId-1,1,this.buscador.Edades);

          }      
        }

        const load=this.buscador.Habitacion[this.Detalles.nId - 1]?true:false;
        if(load=== false)
        { 
          if(this.Detalles.nNinios > 0)
          {
            this.buscador.Habitacion.push({'adultos':this.buscador.Adulto,'num_ninios':this.buscador.Menor,'edades':this.buscador.Edades});
          }
          else
          {
            this.buscador.Habitacion.push({'adultos':this.buscador.Adulto,'num_ninios':this.Detalles.nNinios});
          }
          this.buscador.Edad.push(this.buscador.Edades);

        }

      }
      else{
        if(this.Detalles.nNinios > 0)
          {            
            this.buscador.Habitacion.push({'adultos':this.buscador.Adulto,'num_ninios':this.buscador.Menor,'edades':this.buscador.Edades});
          }
          else
          {
            this.buscador.Habitacion.push({'adultos':this.buscador.Adulto,'num_ninios':this.buscador.Menor});
          }
          this.buscador.Edad = [this.buscador.Edades];

      }
      this.navCtrl.navigateForward('buscador');
    }
    

    /*this.buscador.Habitacion = [this.buscador.Adulto,this.buscador.Menor];
    this.navCtrl.navigateForward(['buscador', {Habitacion:JSON.stringify(this.buscador.Habitacion)}]);*/
    
    /*this.modalCtrl.dismiss({
      Adulto:this.Adulto,
      Menor:this.Menor
    });*/
  }
}
