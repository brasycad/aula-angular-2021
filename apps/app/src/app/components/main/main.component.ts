import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'aula-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private store: StoreService,
    private router: Router
  ) { }

  exit() {
    this.store.logout()
    this.router.navigate(['home'])
  }
}
