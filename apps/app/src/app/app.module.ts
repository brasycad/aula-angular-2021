import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { StoreService } from './services/store.service';
import { AuthInterceptor } from './services/unauthorized.response.interceptor';
import { EquityPipe } from './services/equity.pipe';
import { Watch } from './components/ui/watch/watch';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    UserComponent,
    AnimalsComponent,
    EquityPipe,
    Watch
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (store: StoreService) => new AuthInterceptor(store),
      multi: true,
      deps: [StoreService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
