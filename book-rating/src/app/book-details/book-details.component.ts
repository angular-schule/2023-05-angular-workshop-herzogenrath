import { Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book, BooksslowService } from '../shared/http';
import { catchError, concatMap, map, mergeMap, share, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe, NgIf],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export default class BookDetailsComponent {

  bs = inject(BooksslowService);
  showDetails = false;

  book$ = inject(ActivatedRoute).paramMap.pipe(
    map(paramMap => paramMap.get('isbn') || ''),
    switchMap(isbn => this.bs.booksIsbnSlowGet(isbn)),
    catchError((err: HttpErrorResponse) => of({
      isbn: '000',
      title: 'FEHLER',
      description: err.message
    }))
  );

}
