import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementprevusComponent } from './paiementprevus.component';

describe('PaiementprevusComponent', () => {
  let component: PaiementprevusComponent;
  let fixture: ComponentFixture<PaiementprevusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementprevusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementprevusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
