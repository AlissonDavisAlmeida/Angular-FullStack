import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostsComponent } from "./posts/posts.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    PostsListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
