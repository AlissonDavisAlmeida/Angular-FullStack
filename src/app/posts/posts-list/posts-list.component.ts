import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PostService } from "../post.service";
import { PostModel } from "../PostModel.model";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.css"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  private postSubscription : Subscription;

  posts :PostModel[];

  isLoading = false;

  constructor(private postService : PostService) {

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postSubscription = this.postService.getEmitirListener().subscribe((valor) => {
      this.posts = valor;
    });
  }

  removerPet(indice : string) {
    this.isLoading = true;
    console.log(indice);
    this.postService.deletarPet(indice);
    this.isLoading = false;
  }
}
