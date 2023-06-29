import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor{

  constructor(private token: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:string = this.token.getToken() as string ;
   
  
    if (token != null) {
      token  = token.replace(/['"]+/g, '')
      req = req.clone({ headers: new HttpHeaders({Authorization: 'Bearer ' + token}) }
    );

      
    }
   
    return next.handle(req);
  }
}
