import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth/auth-routing.module";
import { AuthGuard } from "./auth/auth.guard";

import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { PostsListComponent } from "./posts/posts-list/posts-list.component";

const routes: Routes = [
  { path: "", component: PostsListComponent, canActivate: [AuthGuard] },
  { path: "adicionar", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "editar/:id", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "auth", loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
