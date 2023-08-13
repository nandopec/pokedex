import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireObject,
} from '@angular/fire/compat/database';
import { User } from '@user/interfaces/user.interface';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _databasePath = '/users';

    constructor(private _angularFireDatabase: AngularFireDatabase) {}

    createUser(requestBody: User): Promise<void> {
        return this._angularFireDatabase
            .object(`${this._databasePath}/${requestBody.userId}`)
            .update(requestBody);
    }

    getUser(userId: string): Observable<any> {
        return this._angularFireDatabase
            .object(`${this._databasePath}/${userId}`)
            .valueChanges();
    }
}
