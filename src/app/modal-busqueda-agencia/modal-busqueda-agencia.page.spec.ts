import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBusquedaAgenciaPage } from './modal-busqueda-agencia.page';

describe('ModalBusquedaAgenciaPage', () => {
  let component: ModalBusquedaAgenciaPage;
  let fixture: ComponentFixture<ModalBusquedaAgenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBusquedaAgenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBusquedaAgenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
