import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private _snackBar: MatSnackBar) {}

    show(message: string): void {
        this._snackBar.open(message, 'Cerrar', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
}
