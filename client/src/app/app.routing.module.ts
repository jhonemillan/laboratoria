import { ImagesListComponent } from './components/images-list/images-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { NoAuthGuard } from './guards/noauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const appRoutes: Routes = [
  { path: '',   component: HomeComponent},
  { path: 'dashboard',   component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  { path: 'profile' , component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'blogs' , component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'images', component: ImagesListComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];  

@NgModule({
  declarations: [    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes      
    ) 
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }