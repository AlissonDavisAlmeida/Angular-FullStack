import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostsComponent } from "./posts/posts.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { ErroInterceptor } from "./erro.interceptor";
import { ErrorComponent } from "./error/error.component";
import { AngularMaterialModule } from "./angular-material/angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    PostsListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
