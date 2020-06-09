import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioreservacionPage } from './formularioreservacion.page';

describe('FormularioreservacionPage', () => {
  let component: FormularioreservacionPage;
  let fixture: ComponentFixture<FormularioreservacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioreservacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioreservacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
