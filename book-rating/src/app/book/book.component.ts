import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../shared/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  @Input({ required: true }) book?: Book;

  doRateUp() {
    if (this.book) {
      this.rateUp.next(this.book);
    }
  }

  doRateDown() {
    if (this.book) {
      this.rateDown.next(this.book);
    }
  }

  log() {
    console.log('CD', +new Date())
  }
}
