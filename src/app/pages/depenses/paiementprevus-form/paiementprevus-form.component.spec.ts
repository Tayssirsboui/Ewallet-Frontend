import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementprevusFormComponent } from './paiementprevus-form.component';

describe('PaiementprevusFormComponent', () => {
  let component: PaiementprevusFormComponent;
  let fixture: ComponentFixture<PaiementprevusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementprevusFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementprevusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
