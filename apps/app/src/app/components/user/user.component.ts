import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@aula/api-interfaces';
import { Observable } from 'rxjs';
import { map, tap, timeout } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'aula-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    private store: StoreService,

  ) { }
  ngOnInit() {
    setTimeout(() => {
      this.user.equity = this.user.equity + 1000
      console.log(this.user.equity)
    }, 10000)
  }
  get user(): IUser {
    return this.store.user as IUser
  }
}
