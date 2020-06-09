import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabitacionPage } from './habitacion.page';

describe('HabitacionPage', () => {
  let component: HabitacionPage;
  let fixture: ComponentFixture<HabitacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
