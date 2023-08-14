import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pkd-results-card',
    templateUrl: './results-card.component.html',
    styleUrls: ['./results-card.component.scss'],
})
export class ResultsCardComponent {
    @Input() isLoading = false;
    @Input() totalItems = 0;
    @Input() totalItemsLoaded = 0;
    @Output() loadMore = new EventEmitter<void>();

    requestLoadMore(): void {
        this.loadMore.emit();
    }
}
