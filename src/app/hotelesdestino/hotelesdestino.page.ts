import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { ApiService } from '../provider/api.service';
import { NavController } from '@ionic/angular';
import { BuscadorService } from '../provider/buscador.service';


@Component({
  selector: 'app-hotelesdestino',
  templateUrl: './hotelesdestino.page.html',
  styleUrls: ['./hotelesdestino.page.scss'],
})
export class HotelesdestinoPage implements OnInit {

  items:any;
  hoteldestino:any;
  itemsHistorial:any;
  Historial:any ="hidden";

  invisible:any="hidden";

  destinos:any;
  hoteles:any;
  zonas:any;


  constructor(public http: HttpClient,
    public api:ApiService,
    public buscador:BuscadorService,
    public navCtrl: NavController) 
    { 
      this.itemsHistorial = this.buscador.HistorialHotelDestino;  
      console.log(this.itemsHistorial); 

      if(this.itemsHistorial.length > 0)
      {
        this.Historial = ""
      }
  }

  ngOnInit() {     
  }

  initializeItems()
  {
    this.items=this.hoteldestino;
  }

  postHotelDestino(hdestino)
  {
    switch (hdestino.Tipo) {
      case "Destino":
        localStorage.setItem('HotelDestinoCodigo',"d_"+hdestino.Codigo);
        break;
      case "Hotel":
        localStorage.setItem('HotelDestinoCodigo',"h_"+hdestino.Codigo);
        break;
      case "Zona":
        localStorage.setItem('HotelDestinoCodigo',"z_"+hdestino.Codigo);
        break;
    }

    localStorage.setItem('HotelDestinoNombre',hdestino.Nombre);

    if(this.buscador.HistorialHotelDestino.length == 0)
    {
      this.buscador.HistorialHotelDestino.push({'Codigo':hdestino.Codigo,'Nombre':hdestino.Nombre,'Tipo':hdestino.Tipo})  
    }
    else
    {
      if(this.ValidarHistorial(hdestino.Nombre) == false)
      {
        this.buscador.HistorialHotelDestino.push({'Codigo':hdestino.Codigo,'Nombre':hdestino.Nombre,'Tipo':hdestino.Tipo}) 
      }
    }

    this.navCtrl.navigateForward('buscador'); 
    

    

    //this.navCtrl.navigateForward(['buscador', {  HotelDestino:hdestino}]);
  }

  ValidarHistorial(nombre)
  {
    for (let index = 0; index < this.buscador.HistorialHotelDestino.length; index++) {      
      if(nombre == this.buscador.HistorialHotelDestino[index].Nombre)
      {
        return true;
      }
    }
    return false;
  }

  //FILTRO DE BUSQUEDA
  buscarHotelDestino(en: any)
  {
    let val =en.target.value;
    
    if(val && val.trim()!='' && val.length >= 3){ 
      return new Promise(resolve => {
        this.http.get(this.api.urlHotelDestino+'='+val).subscribe(data => {
          resolve(data);        
          this.hoteldestino = data;
          this.initializeItems();
          this.destinos = 0;
          this.zonas = 0;
          this.hoteles = 0;

          this.items=this.items.filter((item)=>{ 
            for (let i = 0; i < this.items.length; i++) {

              if(this.items[i].Tipo == 'Destino'){this.destinos++;}
              if(this.items[i].Tipo == 'Zona'){this.zonas++;}
              if(this.items[i].Tipo == 'Hotel'){this.hoteles++;}
            }            
            this.Historial = "hidden"
            this.invisible = "";
            return(item.Nombre.toLowerCase().indexOf(val.toLowerCase())> -1);
          });
        });
      });     
    }else if(val.length < 3)
    {
      this.destinos = 0;
      this.zonas = 0;
      this.hoteles = 0;
      
      this.items = [];
      this.invisible="hidden";      
    }
  }
}
