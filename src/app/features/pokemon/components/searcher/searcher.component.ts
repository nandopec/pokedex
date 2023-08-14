import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'pkd-searcher',
    templateUrl: './searcher.component.html',
    styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent {
    @Output() searchPokemon = new EventEmitter<string>();
    form = this._buildForm();

    constructor(private _formBuilder: FormBuilder) {}

    validateForm(): void {
        if (this.form.valid) {
            this.searchPokemon.emit(this.form.value.query.toLowerCase().trim());
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            query: ['', Validators.required],
        });
    }
}
