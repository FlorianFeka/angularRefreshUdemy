import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExpirationTimeout;


    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }


    setLogoutTimer(expirationDuration: number) {
        console.log('hi');
        
        this.tokenExpirationTimeout = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
            this.tokenExpirationTimeout = null;
        }
    }
}
