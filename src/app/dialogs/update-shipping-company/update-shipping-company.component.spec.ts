import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingCompanyComponent } from './update-shipping-company.component';

describe('UpdateShippingCompanyComponent', () => {
  let component: UpdateShippingCompanyComponent;
  let fixture: ComponentFixture<UpdateShippingCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShippingCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShippingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
