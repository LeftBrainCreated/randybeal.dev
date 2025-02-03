import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  
// public DisplayObs = new Subject<number>();

protected display: number = 0;

  constructor(
  ) { }

  public setDisplay(size: number): void {
    this.display = size;
    // this.DisplayObs.next(size);
  }

  public getDisplay(): number {
    return this.display;
  }
}
