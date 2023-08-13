import { Component, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { InputValidator } from './input-validator';

@Component({
    template: '',
})
export abstract class SmartComponent
    extends InputValidator
    implements OnDestroy
{
    private readonly unsubscribe$ = new Subject<void>();

    ngOnDestroy() {
        this.unsubscribe();
    }

    protected untilComponentDestroy(): MonoTypeOperatorFunction<any> {
        return takeUntil(this.unsubscribe$);
    }

    protected takeOne(): MonoTypeOperatorFunction<any> {
        return take(1);
    }

    private unsubscribe() {
        if (this.unsubscribe$.closed) {
            return;
        }
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
