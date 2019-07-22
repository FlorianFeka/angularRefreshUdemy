import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService {
    private tokenExpirationTimeout;
    

    constructor(
        private http:HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>
    ){}


    autoLogout(expirationDuration: number){
        this.tokenExpirationTimeout = setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }

    logout(){
        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimeout){
            clearTimeout(this.tokenExpirationTimeout);
        }

        this.tokenExpirationTimeout = null;
    }

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
                email: userData.email,
                userId: userData.id,
                token: userData._token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }))
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    private handleAuthentication(email: string, userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.autoLogout(expiresIn * 1000);
        const user:User = new User(
            email,
            userId,
            token,
            expirationDate
        );
        // this.user.next(user);
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
        }
        ));
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email already exists!';
                break;
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Invalid email or password!';
                break;

            case 'USER_DISABLED':
                errorMessage = 'Your account is disabled, please contact the administrators!';
                break;
        }
        return throwError(errorMessage);
    }

}