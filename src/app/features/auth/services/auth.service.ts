import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActionDataSignin } from '@auth/interfaces/action-data-signin.interface';
import { ActionDataSignup } from '@auth/interfaces/action-data-signup.interface';
import { UserCredential } from '@firebase/auth-types';
import { User as FirebaseUser } from '@firebase/auth-types';
import { Router } from '@angular/router';

const FIREBASE_USER_KEY = 'pkd:user-firebase';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _router: Router
    ) {
        this._angularFireAuth.authState.subscribe(
            (user: FirebaseUser | null) => {
                if (user !== null) {
                    this._saveFirebaseUserInLS(JSON.stringify(user));
                } else {
                    this._saveFirebaseUserInLS('null');
                }
            }
        );
    }

    get currentUser(): FirebaseUser | null {
        return this._getFirebaseUserInLS();
    }

    get isLoggedIn(): boolean {
        const user = this._getFirebaseUserInLS();
        return user !== null && user.emailVerified !== false ? true : false;
    }

    sendVerificationEmail(): Promise<void> {
        return this._angularFireAuth.currentUser.then(
            (user: FirebaseUser | null) => {
                if (user !== null) user.sendEmailVerification();
            }
        );
    }

    signIn(requestBody: ActionDataSignin): Promise<UserCredential> {
        return this._angularFireAuth
            .signInWithEmailAndPassword(requestBody.email, requestBody.password)
            .then((user) => {
                this._saveFirebaseUserInLS(JSON.stringify(user.user));
                return user;
            });
    }

    signOut(): Promise<void> {
        return this._angularFireAuth.signOut().then(() => {
            this._removeFirebaseUserInLS();
            this._goToSignIn();
        });
    }

    signUp(requestBody: ActionDataSignup): Promise<UserCredential> {
        return this._angularFireAuth.createUserWithEmailAndPassword(
            requestBody.email,
            requestBody.password
        );
    }

    private _getFirebaseUserInLS(): FirebaseUser | null {
        return JSON.parse(localStorage.getItem(FIREBASE_USER_KEY)!);
    }

    private _goToSignIn(): void {
        this._router.navigateByUrl('/auth/sign-in');
    }

    private _removeFirebaseUserInLS(): void {
        localStorage.removeItem(FIREBASE_USER_KEY);
    }

    private _saveFirebaseUserInLS(firebaseUser: string): void {
        localStorage.setItem(FIREBASE_USER_KEY, firebaseUser);
    }
}
