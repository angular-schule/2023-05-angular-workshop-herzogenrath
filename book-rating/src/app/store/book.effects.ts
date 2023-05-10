import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { BooksService } from '../shared/http';
import { BookActions } from './book.actions';


@Injectable()
export class BookEffects {

  bs = inject(BooksService);

  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.loadBooks),
      concatMap(() =>
        this.bs.booksGet().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });
}
