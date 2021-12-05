import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { PostModel } from "./PostModel.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private emitirAtualizacaoPosts = new Subject<PostModel[]>();

  private posts : PostModel[] = [];

  constructor(private http : HttpClient) {

  }

  addPost(post : PostModel) {
    const valor = post;

    this.http.post("http://localhost:3001/api/posts/add", { titulo: post.titulo, conteudo: post.conteudo }).subscribe((valor) => {
      this.posts.push(post);
      this.emitirAtualizacaoPosts.next([...this.posts]);
      this.getPosts();
    });
  }

  getEmitirListener() {
    return this.emitirAtualizacaoPosts.asObservable();
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
      "http://localhost:3001/api/posts",
    )
      .pipe(map((postData) => postData.posts.map((post) => ({
        titulo: post.titulo,
        conteudo: post.conteudo,
        _id: post._id,
      }))))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.emitirAtualizacaoPosts.next([...this.posts]);
      });
    return this.posts;
  }

  deletarPet(id : string) {
    console.log(id);
    this.http.delete(`http://localhost:3001/api/posts/${id}`).subscribe((retorno) => {
      const updatePosts = this.posts.filter((post) => post._id !== id);
      this.emitirAtualizacaoPosts.next([...updatePosts]);
    });
  }
}
