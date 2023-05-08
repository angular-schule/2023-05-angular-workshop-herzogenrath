import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book, BooksService } from '../shared/http';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export default class BookDetailsComponent {

  bs = inject(BooksService);
  book?: Book;

  @Input()
  public set isbn(value: string) {
    this.bs.booksIsbnGet(value).subscribe(b => this.book = b)
  }
}
