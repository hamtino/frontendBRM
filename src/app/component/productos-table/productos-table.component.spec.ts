import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTableComponent } from './productos-table.component';

describe('PersonTableComponent', () => {
  let component: ProductosTableComponent;
  let fixture: ComponentFixture<ProductosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
