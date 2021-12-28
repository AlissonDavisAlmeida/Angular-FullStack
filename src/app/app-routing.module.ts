import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { PostsListComponent } from "./posts/posts-list/posts-list.component";

const routes: Routes = [
  { path: "", component: PostsListComponent, canActivate: [AuthGuard] },
  { path: "adicionar", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "editar/:id", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
