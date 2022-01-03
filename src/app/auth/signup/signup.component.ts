import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AuthModel } from "../auth-data.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(private authService : AuthService, private rota : Router) { }

  ngOnInit(): void {
  }

  cadastrar(myForm : NgForm) {
    if (myForm.invalid) {
      return;
    }
    this.isLoading = true;
    const auth : AuthModel = { email: myForm.form.value.email, senha: myForm.form.value.senha };
    this.authService.createUser(auth.email, auth.senha).subscribe((retorno) => {
      console.log(retorno);
      this.isLoading = false;
      this.rota.navigate(["/"]);
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }
}
