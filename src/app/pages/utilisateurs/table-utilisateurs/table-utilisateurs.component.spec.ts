import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUtilisateursComponent } from './table-utilisateurs.component';

describe('TableUtilisateursComponent', () => {
  let component: TableUtilisateursComponent;
  let fixture: ComponentFixture<TableUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUtilisateursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
