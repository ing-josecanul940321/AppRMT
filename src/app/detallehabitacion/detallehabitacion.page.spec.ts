import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallehabitacionPage } from './detallehabitacion.page';

describe('DetallehabitacionPage', () => {
  let component: DetallehabitacionPage;
  let fixture: ComponentFixture<DetallehabitacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallehabitacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallehabitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
