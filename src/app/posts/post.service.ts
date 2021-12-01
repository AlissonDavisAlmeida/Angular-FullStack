import { Injectable, OnInit } from "@angular/core";
import { PostModel } from "./PostModel.model";
import { Subject, Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http";



@Injectable({providedIn:"root"})
export class PostService implements OnInit{
    
    private emitirAtualizacaoPosts = new Subject<PostModel[]>()
    private posts : PostModel[] = []

constructor(private http : HttpClient) {
   
}
    ngOnInit(): void {
        
    }

    addPost(post : PostModel){
      const valor = post
      
        this.http.post("http://localhost:3001/api/posts/add", {"titulo": post.titulo, "conteudo":post.conteudo}).subscribe(valor=>{
           
            this.posts.push(post)
            this.emitirAtualizacaoPosts.next([...this.posts])
        })
    }

    getEmitirListener(){
        return this.emitirAtualizacaoPosts.asObservable()
    }

    getPosts(){
        this.http.get<PostModel[]>("http://localhost:3001/api/posts").subscribe(valor=>{
            this.posts = valor
            this.emitirAtualizacaoPosts.next([...this.posts])
        })
        return this.posts
    }
}