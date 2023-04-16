import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierrevenuComponent } from './calendrierrevenu.component';

describe('CalendrierrevenuComponent', () => {
  let component: CalendrierrevenuComponent;
  let fixture: ComponentFixture<CalendrierrevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierrevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierrevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
