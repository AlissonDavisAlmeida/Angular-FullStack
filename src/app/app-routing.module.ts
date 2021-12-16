import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { PostsListComponent } from "./posts/posts-list/posts-list.component";

const routes: Routes = [
  { path: "", component: PostsListComponent },
  { path: "adicionar", component: PostCreateComponent },
  { path: "editar/:id", component: PostCreateComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
