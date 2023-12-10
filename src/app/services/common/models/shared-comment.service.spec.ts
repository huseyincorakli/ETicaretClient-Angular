import { TestBed } from '@angular/core/testing';

import { SharedCommentService } from './shared-comment.service';

describe('SharedCommentService', () => {
  let service: SharedCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
