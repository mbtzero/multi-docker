import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule,
MatProgressSpinnerModule } from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignuupComponent } from './auth/signup/signuup.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {PostListAdminComponent} from './posts/post-list-admin/post-list-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignuupComponent,
    HomeComponent,
    AdminComponent,
    PostListAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PostListComponent,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
