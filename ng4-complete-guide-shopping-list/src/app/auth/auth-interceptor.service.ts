import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.store.select('auth').pipe(
            take(1), 
            map(state => {
                return state.user;
            }),
            exhaustMap(user => {
            if(user){
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth',user.token)
                })
                return next.handle(modifiedReq);
            }else{
                return next.handle(req);
            }
        }));
    }

}