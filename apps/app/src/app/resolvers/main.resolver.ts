import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IUser } from '@aula/api-interfaces';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<IUser> {
  constructor(
    private storeService: StoreService,
    private apiService: ApiService
  ) {

  }
  resolve(): Observable<IUser> {
    const token = this.storeService.jwt
    const username = token.split('-')[0]
    return this.apiService.fetchUserByUsername(username)
      .pipe(
        tap((user: IUser) => this.storeService.user = user),
        tap(console.log),
      )
  }
}
