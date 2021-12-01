
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../PostModel.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService : PostService) { }

  ngOnInit(): void {
  }

  adicionarPost(nome: HTMLInputElement,post : HTMLTextAreaElement){
    if(nome.required){
      if(nome.value.trim().length == 0){
        return
      }
    }
    this.postService.addPost(new PostModel(nome.value, post.value))
    nome.value = ""
    post.value = ""
  }

 
}
