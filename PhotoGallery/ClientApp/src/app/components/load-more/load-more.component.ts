import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent {
  @Input() isLoadMoreDisplayed: boolean;
  @Output() loadMore = new EventEmitter<number>();

  pageNumber = 0;

  constructor() { }

  loadMoreClick() {
    this.pageNumber += 1;
    this.loadMore.emit(this.pageNumber);
  }
}
