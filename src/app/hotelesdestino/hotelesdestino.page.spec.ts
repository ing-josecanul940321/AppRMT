import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HotelesdestinoPage } from './hotelesdestino.page';

describe('HotelesdestinoPage', () => {
  let component: HotelesdestinoPage;
  let fixture: ComponentFixture<HotelesdestinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelesdestinoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelesdestinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
