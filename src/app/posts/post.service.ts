import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { PostModel } from "./PostModel.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private emitirAtualizacaoPosts = new Subject<PostModel[]>();

  private posts : PostModel[] = [];

  constructor(private http : HttpClient, private router : Router) {

  }

  addPost(post : PostModel, image : File) {
    const valor = post;
    const postData = new FormData();
    postData.append("titulo", post.titulo);
    postData.append("conteudo", post.conteudo);
    postData.append("image", image, post.titulo);

    this.http.post<{ message:string, post: PostModel }>("http://localhost:3001/api/posts/add", postData).subscribe((valor) => {
      const posta : PostModel = {
        _id: valor.post._id, titulo: valor.post.titulo, conteudo: valor.post.conteudo, imagePath: valor.post.imagePath,
      };
      console.log(posta);
      this.posts.push(posta);
      this.emitirAtualizacaoPosts.next([...this.posts]);
      this.router.navigate(["/"]);
      // this.getPosts();
    });
  }

  getEmitirListener() {
    return this.emitirAtualizacaoPosts.asObservable();
  }

  getPost(id : string) {
    this.getPosts();
    return this.http.get(`http://localhost:3001/api/post/${id}`);
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
        imagePath: post.imagePath,
      }))))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.emitirAtualizacaoPosts.next([...this.posts]);
      });

    return this.posts;
  }

  updatePost(id:string, titulo:string, conteudo:string) {
    const post : PostModel = {
      _id: id, titulo, conteudo, imagePath: null,
    };
    this.http.put(`http://localhost:3001/api/post/${id}/`, post).subscribe((retorno) => {
      const updatePosts = [...this.posts];
      const oldPosIndex = updatePosts.findIndex((p) => p._id === post._id);
      updatePosts[oldPosIndex] = post;
      this.posts = updatePosts;
      this.emitirAtualizacaoPosts.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  deletarPet(id : string) {
    console.log(id);
    this.http.delete(`http://localhost:3001/api/posts/${id}`).subscribe((retorno) => {
      this.getPosts();
    });
  }
}
