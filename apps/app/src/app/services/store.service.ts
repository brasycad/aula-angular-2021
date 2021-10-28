import { Injectable } from '@angular/core';
import { IUser } from '@aula/api-interfaces';
const jwd_key = 'AULA-TOKEN'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _user: IUser | undefined;

  validFormat(token: string): boolean {
    return Boolean(token)
  }

  set user(val) {
    this._user = val
    this._user?.token && (this.jwt = this._user?.token as string)
  }
  get user() {
    return this._user
  }
  logout() {
    this.jwt = ''
  }
  set jwt(jwt: string) {
    console.log('set jwt', jwt)
    this.validFormat(jwt) ? window.localStorage.setItem(jwd_key, jwt) : window.localStorage.removeItem(jwd_key);
  }
  get jwt(): any {
    return window.localStorage.getItem(jwd_key);
  }
}
