import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { PostModel } from "./PostModel.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private emitirAtualizacaoPosts = new Subject<{ posts:PostModel[], postsCount:number }>();

  private posts : PostModel[] = [];

  quantidade : number;

  constructor(private http : HttpClient, private router : Router) {

  }

  addPost(post : PostModel, image : File) {
    const valor = post;
    const postData = new FormData();
    postData.append("titulo", post.titulo);
    postData.append("conteudo", post.conteudo);
    postData.append("image", image, post.titulo);

    this.http.post<{ message:string, post: PostModel }>("http://localhost:3001/api/posts/add", postData, { headers: { token: "olá" } }).subscribe((valor) => {
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

  getPosts(pageSize:number = 3, page:number = 1) {
    this.http
      .get<{ message: string; posts: any, count:number }>(
      `http://localhost:3001/api/posts?pageSize=${pageSize}&page=${page}`,
    )
      .pipe(map((postData) => ({
        posts: postData.posts.map((post) => ({
          titulo: post.titulo,
          conteudo: post.conteudo,
          _id: post._id,
          imagePath: post.imagePath,
        })),
        cont: postData.count,
      })))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.quantidade = transformedPosts.cont;
        console.log(this.quantidade);
        this.emitirAtualizacaoPosts.next({ posts: this.posts, postsCount: this.quantidade });
      });

    return this.posts;
  }

  updatePost(id:string, titulo:string, conteudo:string, imagePath: File | string) {
    let post: PostModel | FormData;
    if (typeof (imagePath) === "object") {
      post = new FormData();
      post.append("id", id);
      post.append("titulo", titulo);
      post.append("conteudo", conteudo);
      post.append("imagePath", imagePath, titulo);
    } else {
      post = {
        _id: id, titulo, conteudo, imagePath,
      };
    }

    this.http.put(`http://localhost:3001/api/post/${id}/`, post).subscribe((retorno) => {
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
