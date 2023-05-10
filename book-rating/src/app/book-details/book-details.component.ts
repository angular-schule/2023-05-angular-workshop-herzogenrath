import { Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book, BooksslowService } from '../shared/http';
import { concatMap, map, mergeMap, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export default class BookDetailsComponent {

  bs = inject(BooksslowService);

  book$ = inject(ActivatedRoute).paramMap.pipe(
    map(paramMap => paramMap.get('isbn') || ''),
    switchMap(isbn => this.bs.booksIsbnSlowGet(isbn)),
    share()
  );

}
