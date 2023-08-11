import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'Index',component:IndexComponent},
  {path:'Login', component:LoginComponent},
  {path:'Cadastrar', component:RegisterComponent},
  {path:'Usuarios', component:UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
