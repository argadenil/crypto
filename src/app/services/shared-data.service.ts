import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private data = new BehaviorSubject<any>('');
  public data$ = this.data.asObservable();
  constructor() {
  }

  emitdata(x: any) {
    this.data.next(x);
  }
}
