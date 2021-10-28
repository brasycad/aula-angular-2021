import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { IUser } from '@aula/api-interfaces';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }
  @Post('checkUserLogin')
  checkUserLogin(@Body() params) {
    return this.appService.checkUserLogin(params)
  }
  @Get('user/:username')
  fetchUserByUsername(@Param() params, @Headers('Authorization') Authorization): Observable<IUser> {
    return this.appService.isTokenValid(Authorization)
      .pipe(
        switchMap((result: boolean) => result ? this.appService.fetchUserByUsername(params) : of(null)),
        map((user: IUser) => _.omit(user, ['password']))
      )
  }
  isValidToken(token) {
    return this.appService.isTokenValid(token)
  }
}
