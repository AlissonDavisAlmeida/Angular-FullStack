import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token : string;

  private userId : string;

  private tokenTimer : any;

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

  getUserId() {
    return this.userId;
  }

  createUser(email : string, senha : string) {
    return this.http.post("http://localhost:3001/api/user/signup", { email, senha });
  }

  login(email: string, senha : string) {
    this.http.post<{ mensagem:string, token:string, expiresIn:string, userId:string }>("http://localhost:3001/api/user/login", { email, senha }).subscribe((retorno) => {
      this.token = retorno.token;
      if (retorno.token) {
        this.isAuthenticate = true;
        this.tokenEmissor.next(true);
        this.userId = retorno.userId;
        const expiresInDuration = +retorno.expiresIn;
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expiration = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expiration, this.userId);
        this.rota.navigate(["/"]);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticate = true;
      this.setAuthTimer(expiresIn / 1000);
      this.userId = authInformation.userId;
      this.tokenEmissor.next(true);
    }
  }

  private setAuthTimer(duration : number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticate = false;
    this.tokenEmissor.next(false);
    this.userId = null;
    this.rota.navigate(["/login"]);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token : string, expirationDate : Date, userId : string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expiration) {
      return null;
    }
    return {
      token,
      expirationDate: new Date(expiration),
      userId,
    };
  }
}
