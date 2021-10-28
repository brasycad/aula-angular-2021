import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '@aula/api-interfaces';

@Component({
  selector: 'aula-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: any
  constructor(
    private api: ApiService
  ) { }
  ngOnInit() {

    this.user$ = this.api.fetchUserByUsername('Miguel')
      .pipe(
        tap(console.log),
      )
  }
}
