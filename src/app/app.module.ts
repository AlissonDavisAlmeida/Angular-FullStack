import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthInterceptor } from "./auth/auth.interceptor";
import { ErroInterceptor } from "./erro.interceptor";
import { ErrorComponent } from "./error/error.component";
import { AngularMaterialModule } from "./angular-material/angular-material.module";
import { PostsModule } from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    PostsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
