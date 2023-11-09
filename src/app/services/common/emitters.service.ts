import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class CategoryEmitterService {
  public categoryStatusChanged: EventEmitter<void> = new EventEmitter<void>();
  public addressAdded: EventEmitter<void> = new EventEmitter<void>();

  public updateCategory:EventEmitter<void> = new EventEmitter<void>();
  
  // Diğer servis fonksiyonları ve işlemleri
}