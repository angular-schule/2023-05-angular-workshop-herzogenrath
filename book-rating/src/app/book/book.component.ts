import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input({ required: true }) book?: Book;
}
