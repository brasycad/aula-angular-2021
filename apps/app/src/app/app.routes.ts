import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimalsComponent } from './components/animals/animals.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { MainResolver } from './resolvers/main.resolver';
import { CanactivateService } from './services/canactivate.service';
const mainChildren = [
    { path: 'user', component: UserComponent },
    { path: 'animals', component: AnimalsComponent },
]
const routes = [
    { path: 'login', component: LoginComponent },
    { path: '', canActivate: [CanactivateService], resolve: { user: MainResolver }, component: MainComponent, children: mainChildren },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
