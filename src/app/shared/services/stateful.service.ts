import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatefulService {
  private signedIn: boolean = false;

  constructor() {}

  public getSignedIn(): Boolean {
    return this.signedIn;
  }

  public changeSignedInState(): void {
    this.signedIn = !this.signedIn;
  }
}
