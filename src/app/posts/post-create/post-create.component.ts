import {
  Component, EventEmitter, Input, OnInit, Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { mimeType } from "./mime-type.validator";
import { PostService } from "../post.service";
import { PostModel } from "../PostModel.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  mode = "create";

  myForm : FormGroup;

  isLoading = false;

  post : PostModel = null;

  imagePreview : string = "";

  Id : string;

  constructor(public postService : PostService, private router : Router,
    private activated : ActivatedRoute) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nome: new FormControl("", { validators: [Validators.required, Validators.minLength(3)] }),
      descricao: new FormControl("", { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    this.activated.paramMap.subscribe((paramMap:ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "editar";
        this.Id = paramMap.get("id");
        this.isLoading = true;
        this.postService.getPost(this.Id).subscribe((retorno :PostModel) => {
          console.log(retorno);
          this.isLoading = false;
          this.post = retorno;
          this.myForm.setValue({
            nome: this.post.titulo,
            descricao: this.post.conteudo,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.Id = null;
      }
    });
  }

  adicionarPost() {
    // console.log(this.myForm);
    if (this.myForm.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postService.addPost(new PostModel(this.myForm.value.nome, this.myForm.value.descricao), this.myForm.value.image);
    } else {
      this.postService.updatePost(this.post._id, this.myForm.value.nome, this.myForm.value.descricao, this.myForm.value.image);
    }

    this.myForm.reset();
  }

  onImagePicked(event:Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    this.myForm.patchValue({ image: file });
    this.myForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // console.log(this.myForm);
  }

  getNameImage() {
    return (<File> this.myForm.value.image).name;
  }
}
