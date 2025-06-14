import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainModalService {
  isModalShown: boolean = false;
  private modalTimer: any;

  constructor() {
  }

  clearModalTimer() {
    if (this.modalTimer) {
      this.modalTimer = null;
    }
  }

  startModalTimer(): Observable<undefined> {
    return new Observable(subscriber => {
      this.modalTimer = setTimeout(() => {
        subscriber.next();
      }, 10000);
    });
  }
}
