import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalcuponPage } from './modalcupon.page';

describe('ModalcuponPage', () => {
  let component: ModalcuponPage;
  let fixture: ComponentFixture<ModalcuponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcuponPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalcuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
