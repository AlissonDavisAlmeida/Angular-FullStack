import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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

  size : number;

  posts :PostModel[];

  isLoading = false;

  constructor(private postService : PostService) {

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.postService.getPosts(2, 1);

    this.postSubscription = this.postService.getEmitirListener().subscribe((valor) => {
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
