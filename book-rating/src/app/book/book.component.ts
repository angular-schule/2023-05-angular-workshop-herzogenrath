import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input({ required: true })
  book?: Book;

  constructor() {
    console.log('Das Buch ist im Kontruktor', this.book)
  }

  ngOnInit() {
    console.log('Das Buch ist in der ngOnInit', this.book)
  }
}
