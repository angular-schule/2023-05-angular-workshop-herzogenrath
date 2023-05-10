import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookCreateComponent } from '../book-create/book-create.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { selectBooks, selectFirstBook, selectLoading } from '../store/book.reducer';
import { BookActions } from '../store/book.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, BookComponent, BookCreateComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // Observables
  books$ = inject(Store).select(selectBooks);
  loading$ = inject(Store).select(selectLoading);
  selectFirstBook$ = inject(Store).select(selectFirstBook);

  // Signals
  books$$ = inject(Store).selectSignal(selectBooks);
  loading$$ = inject(Store).selectSignal(selectLoading);
  selectFirstBook$$  = inject(Store).selectSignal(selectFirstBook);

  // playing with signals...
  firstBookTitle = computed(() => this.selectFirstBook$$()?.title );

  constructor(store: Store) {
    store.dispatch(BookActions.loadBooks());
  }

  // signals are cool! =)
  getFirstTitle() {
    return this.selectFirstBook$$()?.title;
  }

  doRateUp(book: Book) {
    // const ratedBook = this.br.rateUp(book);
    // // const ratedBook = {
    // //   ...book,
    // //   rating: book.rating < 5 ? book.rating + 1 : 5
    // // };
    // this.updateAndSort(ratedBook);
  }

  doRateDown(book: Book) {
    // const ratedBook = this.br.rateDown(book);
    // this.updateAndSort(ratedBook);
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
