import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarifasPage } from './tarifas.page';

describe('TarifasPage', () => {
  let component: TarifasPage;
  let fixture: ComponentFixture<TarifasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
