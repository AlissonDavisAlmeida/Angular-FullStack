import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthModel } from "../auth-data.model";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(myForm : NgForm) {
    if (myForm.invalid) {
      return;
    }
    const user : AuthModel = { email: myForm.value.email, senha: myForm.value.senha };
    this.auth.login(user.email, user.senha);
  }
}
