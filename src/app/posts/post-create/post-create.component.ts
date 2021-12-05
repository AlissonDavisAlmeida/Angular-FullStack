import {
  Component, EventEmitter, Input, OnInit, Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "../post.service";
import { PostModel } from "../PostModel.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  constructor(private postService : PostService, private router : Router) { }

  ngOnInit(): void {
  }

  adicionarPost(nome: HTMLInputElement, post : HTMLTextAreaElement) {
    if (nome.required) {
      if (nome.value.trim().length === 0) {
        return;
      }
    }
    this.postService.addPost(new PostModel(nome.value, post.value));
    this.router.navigate(["/"]);
    nome.value = "";
    post.value = "";
  }
}
