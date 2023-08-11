import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from '@angular/fire/compat/database';
import { User } from '@user/interfaces/user.interface';

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
}
