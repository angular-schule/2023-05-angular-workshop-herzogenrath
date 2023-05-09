import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book, BooksslowService } from '../shared/http';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export default class BookDetailsComponent {

  bs = inject(BooksslowService);
  book?: Book;

  @Input()
  public set isbn(value: string) {
    this.bs.booksIsbnSlowGet(value).subscribe(b => this.book = b)
  }
}
