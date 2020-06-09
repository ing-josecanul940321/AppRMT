import { Component, OnInit, ɵConsole } from '@angular/core';
import { CalendarComponentOptions, DayConfig, CalendarModalOptions, MonthComponent } from 'ion2-calendar';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

//import {MomentModule} from 'angular2-moment/moment.module';
import * as Moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  
  dateRange: { from: string; to: string; } ={    
    from:Moment(localStorage.getItem("FechaInicio"), 'DD/MM/YYYY').format('YYYY-MM-DD'),
    to:Moment(localStorage.getItem("FechaFin"), 'DD/MM/YYYY').format('YYYY-MM-DD'),
  }; 

  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    monthPickerFormat:['Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Jun', 'Jul', 'Agosto', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthFormat:'MMM YYYY'
  };
  
  constructor(public navCtrl:NavController,
    private datePipe: DatePipe,) {      
    }

  ngOnInit() {
  }

  postCalendario()
  {   

    this.dateRange.from = this.datePipe.transform(this.dateRange.from, 'dd/MM/yyyy');
    this.dateRange.to = this.datePipe.transform(this.dateRange.to, 'dd/MM/yyyy');

    localStorage.setItem("FechaInicio",this.dateRange.from);
    localStorage.setItem("FechaFin",this.dateRange.to);
    
    this.navCtrl.navigateForward('buscador');
  }

}
