import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CategoryEmitterService {
  public categoryStatusChanged: EventEmitter<void> = new EventEmitter<void>();
  public addressAdded: EventEmitter<void> = new EventEmitter<void>();
  public deneme: EventEmitter<void> = new EventEmitter<void>();

  public updateCategory:EventEmitter<void> = new EventEmitter<void>();
  
  private brandNameSource = new Subject<string>();

  brandName$ = this.brandNameSource.asObservable();

  sendBrandName(brandName: string) {
    this.brandNameSource.next(brandName);
  }
}