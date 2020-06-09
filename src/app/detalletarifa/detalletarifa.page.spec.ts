import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalletarifaPage } from './detalletarifa.page';

describe('DetalletarifaPage', () => {
  let component: DetalletarifaPage;
  let fixture: ComponentFixture<DetalletarifaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalletarifaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalletarifaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
