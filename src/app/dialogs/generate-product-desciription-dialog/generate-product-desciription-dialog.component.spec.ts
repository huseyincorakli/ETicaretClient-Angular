import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProductDesciriptionDialogComponent } from './generate-product-desciription-dialog.component';

describe('GenerateProductDesciriptionDialogComponent', () => {
  let component: GenerateProductDesciriptionDialogComponent;
  let fixture: ComponentFixture<GenerateProductDesciriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateProductDesciriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateProductDesciriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
