import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

import { PostService } from "../post.service";
import { PostModel } from "../PostModel.model";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.css"],

})
export class PostsListComponent implements OnInit, OnDestroy {
  private postSubscription : Subscription;

  size : number;

  isAuthenticate : boolean = false;

  isAuthenticateSubscription : Subscription;

  userId :string;

  posts :PostModel[];

  isLoading = false;

  constructor(private postService : PostService, private authService : AuthService) {

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.isAuthenticateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.postService.getPosts(2, 1);
    this.userId = this.authService.getUserId();
    this.isAuthenticateSubscription = this.authService.getTokenEmissor().subscribe((autenticado) => {
      this.isAuthenticate = autenticado;
      console.log(this.isAuthenticate);
    });
    this.isAuthenticate = this.authService.getIsAuthenticate();
    this.postSubscription = this.postService.getEmitirListener().subscribe((valor) => {
      this.userId = this.authService.getUserId();
      this.posts = valor.posts;
      this.size = valor.postsCount;
    });
  }

  removerPet(indice : string) {
    this.isLoading = true;
    console.log(indice);
    this.postService.deletarPet(indice);
    this.isLoading = false;
  }

  onPageChange(event : PageEvent) {
    this.postService.getPosts(event.pageSize, event.pageIndex + 1);
  }
}
