import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BookCreateComponent } from '../book-create/book-create.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BooksService } from '../shared/http';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { selectBooks, selectLoading } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, BookComponent, BookCreateComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  books$ = inject(Store).selectSignal(selectBooks);
  loading$ = inject(Store).selectSignal(selectLoading);

  constructor(private store: Store) {
    this.store.dispatch(BookActions.loadBooks())
  }

  doRateUp(book: Book) {
    this.store.dispatch(BookActions.rateUp({ book }));
  }

  doRateDown(book: Book) {
    this.store.dispatch(BookActions.rateDown({ book }));
  }

  updateAndSort(ratedBook: Book) {
    // this.books = this.books
    //   .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //   .sort((a, b) => b.rating - a.rating)
  }

  addBook(newBook: Book) {
    // this.books = [...this.books, newBook];
  }
}
