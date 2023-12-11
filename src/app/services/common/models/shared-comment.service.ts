import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedCommentService {
  private commentSubmittedSource = new Subject<void>();

  commentSubmitted$ = this.commentSubmittedSource.asObservable();

  notifyCommentSubmitted() {
    this.commentSubmittedSource.next();
  }
}
