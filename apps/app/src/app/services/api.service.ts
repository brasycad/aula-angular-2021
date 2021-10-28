import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@aula/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }
  public fetchUserByUsername(username: string) {
    return this.http.get<IUser>(`/api/user/${username}`)
  }
  public checkUserLogin(data: { username: string, password: string }): Observable<IUser> {
    return this.http.post('/api/checkUserLogin', data)
      .pipe(
        map((u: any) => u)
      )
  }
}
