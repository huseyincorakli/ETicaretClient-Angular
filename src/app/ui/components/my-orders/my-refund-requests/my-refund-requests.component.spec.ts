import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRefundRequestsComponent } from './my-refund-requests.component';

describe('MyRefundRequestsComponent', () => {
  let component: MyRefundRequestsComponent;
  let fixture: ComponentFixture<MyRefundRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRefundRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRefundRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
