import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeastStockedProductsComponent } from './least-stocked-products.component';

describe('LeastStockedProductsComponent', () => {
  let component: LeastStockedProductsComponent;
  let fixture: ComponentFixture<LeastStockedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeastStockedProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeastStockedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
