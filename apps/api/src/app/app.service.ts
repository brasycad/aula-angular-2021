import { Injectable } from '@nestjs/common';
import { CURRENCIES, IUser } from '@aula/api-interfaces';
import { Observable, of, } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as _ from 'lodash'

@Injectable()
export class AppService {
  public isTokenValid(token: string): Observable<boolean> {
    const splitted = token?.split('-')
    if (splitted?.length == 2) {
      const _id = splitted[1]
      const username = splitted[0]

      return of(this.users.find((u: IUser) => u._id == _id && u.username == username))
        .pipe(
          map(Boolean)
        )
    }
  }
  public fetchUserByUsername({ username }): Observable<IUser> {
    return of(this.users)
      .pipe(
        delay(2000),
        map((users: IUser[]) => users.find((u: IUser) => u.username == username)),
      )
  }
  checkUserLogin({ username, password }): Observable<IUser> {
    return this.fetchUserByUsername({ username: username })
      .pipe(
        map((user: IUser) => user?.password == password ? _.assign(_.omit(user, ['password']), { token: this.getUserToken(user) }) : null)
      )
  }
  getUserToken(user: IUser): string {
    return `${user.username}-${user._id}`
  }
  get users(): IUser[] {
    return [
      {
        _id: '1',
        username: 'Antonio',
        password: 'Antonio',
        name: 'Antonio Perez Gomez',
        age: 32,
        currency: CURRENCIES.DOLLAR,
        equity: 1234
      },
      {
        _id: '2',
        username: 'jose_el_valiente',
        password: 'Jose',
        name: 'Jose Valiente Gomez',
        age: 23,
        currency: CURRENCIES.DOLLAR,
        equity: 1234
      },
      {
        _id: '3',
        username: 'Arturo',
        password: 'Arturo',
        name: 'Arturo Perez Reverte',
        age: 62,
        currency: CURRENCIES.EURO,
        equity: 12834
      },
      {
        _id: '4',
        username: 'Diego',
        password: 'Diego',
        name: 'Diego Lujan Gomez',
        age: 65,
        currency: CURRENCIES.EURO,
        equity: 4234
      },
      {
        _id: '5',
        username: 'Miguel',
        password: 'Miguel',
        name: 'Miguel Angel Garcia',
        age: 23,
        currency: CURRENCIES.DOLLAR,
        equity: 234
      },
      {
        _id: '6',
        username: 'Javier',
        password: 'Javier',
        name: 'Javier Villar Alarcon',
        age: 23,
        currency: CURRENCIES.EURO,
        equity: 11234
      },
    ]
  }
}


