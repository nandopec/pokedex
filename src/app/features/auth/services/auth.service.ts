import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, User as FirebaseUser } from '@angular/fire/auth';
import { ActionDataSignin } from '@auth/interfaces/action-data-signin.interface';
import { ActionDataSignup } from '@auth/interfaces/action-data-signup.interface';
import { UserCredential } from '@firebase/auth-types';
import { User } from '@firebase/auth-types';

const FIREBASE_USER_KEY = 'pkd:user-firebase';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseUser: User | null = null;

    constructor(private _angularFireAuth: AngularFireAuth) {
        this._angularFireAuth.authState.subscribe((user: User | null) => {
            if (user !== null) {
                this.firebaseUser = user;
                this._saveFirebaseUserInLS(JSON.stringify(user));
            } else {
                this._saveFirebaseUserInLS('null');
            }
        });
    }

    get currentUser(): FirebaseUser | null {
        const auth = getAuth();
        return auth.currentUser;
    }

    get isLoggedIn(): boolean {
        const user = this._getFirebaseUserInLS();
        return user !== null && user.emailVerified !== false ? true : false;
    }

    sendVerificationEmail(): Promise<void> {
        return this._angularFireAuth.currentUser.then((user: User | null) => {
            if (user !== null) user.sendEmailVerification();
        });
    }

    signIn(requestBody: ActionDataSignin): Promise<UserCredential> {
        return this._angularFireAuth.signInWithEmailAndPassword(
            requestBody.email,
            requestBody.password
        );
    }

    signOut(): Promise<void> {
        return this._angularFireAuth.signOut().then(() => {
            this._removeFirebaseUserInLS();
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

    private _removeFirebaseUserInLS(): void {
        localStorage.removeItem(FIREBASE_USER_KEY);
    }

    private _saveFirebaseUserInLS(firebaseUser: string): void {
        localStorage.setItem(FIREBASE_USER_KEY, firebaseUser);
    }
}
