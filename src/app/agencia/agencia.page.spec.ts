import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgenciaPage } from './agencia.page';

describe('AgenciaPage', () => {
  let component: AgenciaPage;
  let fixture: ComponentFixture<AgenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
