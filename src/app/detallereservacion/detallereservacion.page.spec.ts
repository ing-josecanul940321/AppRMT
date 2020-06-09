import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallereservacionPage } from './detallereservacion.page';

describe('DetallereservacionPage', () => {
  let component: DetallereservacionPage;
  let fixture: ComponentFixture<DetallereservacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallereservacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallereservacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
