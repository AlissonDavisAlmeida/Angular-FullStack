import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],

})
export class HeaderComponent implements OnInit, OnDestroy {
  isValidToken : boolean = false;

  isValidSubscription : Subscription;

  constructor(private router : Router, private authService : AuthService) { }

  ngOnDestroy(): void {
    this.isValidSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isValidSubscription = this.authService.getTokenEmissor().subscribe((token) => {
      console.log(this.isValidToken);
      this.isValidToken = token;
    });
  }

  irParaAdicionar() {
    this.router.navigate(["adicionar"]);
  }

  logout() {
    this.authService.logout();
  }
}
