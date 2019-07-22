import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthetications = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate
    });
};
const handleError = (err: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred!';
    if (!err.error || !err.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (err.error.error.message) {
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDTTpyWa_b0W2BmVkapUIOLi84VWphT7z4',
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map((resData) => {
                    return handleAuthetications(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    )
                }), catchError(err => {
                    return handleError(err);
                }));
        })
    );


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn);
                }),
                map((resData) => {
                    return handleAuthetications(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );
                }), catchError(err => {
                    return handleError(err);
                }));
        })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                // this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                    email: userData.email,
                    userId: userData.id,
                    token: userData._token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                });
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }
            return { type: 'DUMMY' };
        }));

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap(() => {
        this.router.navigate(['/']);
    }));

    @Effect()
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
    }));


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) { }
}
