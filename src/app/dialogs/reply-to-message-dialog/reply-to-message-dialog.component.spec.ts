import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToMessageDialogComponent } from './reply-to-message-dialog.component';

describe('ReplyToMessageDialogComponent', () => {
  let component: ReplyToMessageDialogComponent;
  let fixture: ComponentFixture<ReplyToMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyToMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyToMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
