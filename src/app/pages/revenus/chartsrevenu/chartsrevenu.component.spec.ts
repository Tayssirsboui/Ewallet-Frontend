import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsrevenuComponent } from './chartsrevenu.component';

describe('ChartsrevenuComponent', () => {
  let component: ChartsrevenuComponent;
  let fixture: ComponentFixture<ChartsrevenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsrevenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsrevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
