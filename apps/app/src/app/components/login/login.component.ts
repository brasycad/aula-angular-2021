import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, delay, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'aula-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup | undefined;
  public send$: Observable<any> | undefined
  public loading = false
  word$: Observable<boolean> | undefined;
  info: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.storeService.jwt ? this.goInside() : this.setupForm()

  }
  goInside() {
    this.router.navigate(['', 'user'])
  }
  setupForm() {
    const form = {
      username: ['', {
        validators: [Validators.required, Validators.minLength(5)]
      }],
      password: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }]
    }
    this.dataForm = this.formBuilder.group(form)
    this.word$ = this.dataForm.get('username')?.valueChanges
      .pipe(
        delay(500),
        distinctUntilChanged(),
        filter((word: string) => word.length > 4),
        switchMap((word: string) => this.apiService.checkIfUsernameExist(word)),
        tap((res: boolean) => this.info = res ? 'existe' : 'no existe')
      )
  }
  send() {
    if ((this.dataForm as FormGroup).valid) {
      this.loading = true
      this.send$ = this.apiService.checkUserLogin((this.dataForm as FormGroup).value)
        .pipe(
          tap(() => this.loading = false),
          map((user: any) => {
            this.storeService.user = user
            return {
              token: user?.token,
              error: !user
            }
          }),
          tap((data: any) => data.token ? this.goInside() : null)
        )
    } else {
      this.send$ = undefined
    }
  }
}
