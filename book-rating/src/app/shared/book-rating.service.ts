import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

export class BookRatingService {

  static rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < maxRating ? book.rating + 1 : maxRating
    }
  }

  static rateDown(book: Book): Book {
    const rating = Math.max(book.rating - 1, minRating);

    return {
      ...book,
      rating
    }
  }
}
