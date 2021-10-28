import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateService implements CanActivate {
  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }
  public canActivate(): Observable<boolean> {
    const valid = Boolean(this.storeService.jwt)
    if (!valid)
      this.router.navigate(['home'])
    return of(valid)
  }

}
