/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
}

export const initialState: State = {
  books: [],
  loading: false
};

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer: createReducer(
    initialState,

    on(BookActions.loadBooks, state => ({
      ...state,
      loading: true
    })),

    on(BookActions.loadBooksSuccess,  (state, { books }) => ({
      ...state,
      loading: false,
      books
    })),

    on(BookActions.loadBooksFailure,state =>  ({
      ...state,
      loading: false,
      books: []
    }))
  ),

  extraSelectors: ({ selectBooks, selectLoading }) => ({
    selectFirstBook: createSelector(
      selectBooks,
      selectLoading,
      (books, loading) => loading ? undefined : books.length ? books[0] : undefined
    )
  }),
});


export const {
  name,            // feature name
  reducer,         // feature reducer
  selectBookState, // feature selector
  selectBooks,     // feature state property
  selectLoading,   // feature state property
  selectFirstBook
} = bookFeature;
