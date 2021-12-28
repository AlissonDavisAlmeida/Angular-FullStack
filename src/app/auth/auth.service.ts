import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token : string;

  private isAuthenticate = false;

  private tokenEmissor = new Subject<boolean>();

  constructor(private http : HttpClient, private rota : Router) { }

  getTokenEmissor() {
    return this.tokenEmissor.asObservable();
  }

  getIsAuthenticate() {
    return this.isAuthenticate;
  }

  getToken() {
    return this.token;
  }

  createUser(email : string, senha : string) {
    return this.http.post("http://localhost:3001/api/user/signup", { email, senha });
  }

  login(email: string, senha : string) {
    this.http.post<{ mensagem:string, token:string }>("http://localhost:3001/api/user/login", { email, senha }).subscribe((retorno) => {
      this.token = retorno.token;
      if (retorno.token) {
        this.isAuthenticate = true;
        this.tokenEmissor.next(true);
        this.rota.navigate(["/"]);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticate = false;
    this.tokenEmissor.next(false);
    this.rota.navigate(["/login"]);
  }
}
