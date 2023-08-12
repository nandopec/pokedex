import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActionDataSignin } from '@auth/interfaces/action-data-signin.interface';
import { ActionDataSignup } from '@auth/interfaces/action-data-signup.interface';
import { UserCredential } from '@firebase/auth-types';
import { User } from '@firebase/auth-types';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseUser: User | null = null;

    constructor(private _angularFireAuth: AngularFireAuth) {
        this._angularFireAuth.authState.subscribe((user: User | null) => {
            if (user !== null) {
                this.firebaseUser = user;
            }
        });
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
        return this._angularFireAuth.signOut();
    }

    signUp(requestBody: ActionDataSignup): Promise<UserCredential> {
        return this._angularFireAuth.createUserWithEmailAndPassword(
            requestBody.email,
            requestBody.password
        );
    }
}
