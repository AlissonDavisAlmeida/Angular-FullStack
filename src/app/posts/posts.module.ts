import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PostsComponent } from "./posts.component";

@NgModule({
  declarations: [
    PostsListComponent,
    PostCreateComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
  ],

})
export class PostsModule { }
