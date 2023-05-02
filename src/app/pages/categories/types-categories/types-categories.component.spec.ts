import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesCategoriesComponent } from './types-categories.component';

describe('TypesCategoriesComponent', () => {
  let component: TypesCategoriesComponent;
  let fixture: ComponentFixture<TypesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
