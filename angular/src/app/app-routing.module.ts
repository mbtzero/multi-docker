import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {LoginComponent} from './auth/login/login.component';
import {SignuupComponent} from './auth/signup/signuup.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignuupComponent },
  { path: 'admin', component: AdminComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
