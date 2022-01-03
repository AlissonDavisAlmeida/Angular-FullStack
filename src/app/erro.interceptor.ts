import {
  HttpRequest,
  HttpHandler,

  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "./error/error.component";

@Injectable({ providedIn: "root" })
export class ErroInterceptor implements HttpInterceptor {
  constructor(private dialog : MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((err : HttpErrorResponse) => {
        let errorMessage = "Ocorreu um erro";
        if (err.error.erro.message) {
          errorMessage = err.error.erro.message;
        }
        console.log(err);
        this.dialog.open(ErrorComponent, { data: { mensagem: errorMessage } });
        /* alert(err.error.erro.message); */
        return throwError(err);
      }),
    );
  }
}
