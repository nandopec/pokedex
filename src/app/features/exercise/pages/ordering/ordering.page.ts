import { Component, OnInit } from '@angular/core';
import { Duplicity } from '@exercise/interfaces/duplicity.interface';

@Component({
    selector: 'pkd-ordering',
    templateUrl: './ordering.page.html',
    styles: [],
})
export class OrderingPage {
    result: Duplicity[] = [];

    doExercise(value: string): void {
        const arrValues = value.split(',');
        const duplicitiesObject = this._generateDuplicateObject(arrValues);
        const duplicitiesArray = this._converObjectToArray(duplicitiesObject);
        const duplicitiesSorted = this._sortArray(duplicitiesArray);
        this.result = duplicitiesSorted;
    }

    private _converObjectToArray(object: object): Duplicity[] {
        const array = Object.entries(object);
        const newArray: Duplicity[] = [];
        array.forEach(([key, value]) => {
            newArray.push({
                key: parseInt(key),
                value,
            });
        });
        return newArray;
    }

    private _generateDuplicateObject(values: string[]): object {
        const duplicities: any = {};
        values.forEach(function (x) {
            duplicities[x] = (duplicities[x] || 0) + 1;
        });
        return duplicities;
    }

    private _sortArray(duplicities: Duplicity[]): Duplicity[] {
        return duplicities.sort((a, b) =>
            a.key < b.key ? 1 : a.key > b.key ? -1 : 0
        );
    }
}
