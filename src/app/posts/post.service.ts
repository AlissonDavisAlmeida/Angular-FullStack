import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
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

    this.http.post<{ message:string, post: PostModel }>(`${environment.apiUrl}/posts/add`, postData, { headers: { token: "olá" } }).subscribe((valor) => {
      console.log(valor);
      this.router.navigate(["/"]);
      // this.getPosts();
    });
  }

  getEmitirListener() {
    return this.emitirAtualizacaoPosts.asObservable();
  }

  getPost(id : string) {
    this.getPosts();
    return this.http.get(`${environment.apiUrl}/post/${id}`);
  }

  getPosts(pageSize:number = 3, page:number = 1) {
    this.http
      .get<{ message: string; posts: any, count:number }>(
      `${environment.apiUrl}/posts?pageSize=${pageSize}&page=${page}`,
    )
      .pipe(map((postData) => ({
        posts: postData.posts.map((post) => ({
          titulo: post.titulo,
          conteudo: post.conteudo,
          _id: post._id,
          imagePath: post.imagePath,
          criador: post.criador,
        })),
        cont: postData.count,
      })))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.quantidade = transformedPosts.cont;
        console.log(this.posts);
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
        _id: id, titulo, conteudo, imagePath, criador: null,
      };
    }

    this.http.put(`${environment.apiUrl}/post/${id}/`, post).subscribe((retorno) => {
      this.router.navigate(["/"]);
    });
  }

  deletarPet(id : string) {
    console.log(id);
    this.http.delete(`${environment.apiUrl}/posts/${id}`).subscribe((retorno) => {
      console.log(retorno);
      this.getPosts();
      this.router.navigate([""]);
    });
  }
}
