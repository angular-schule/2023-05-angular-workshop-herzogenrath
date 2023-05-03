import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../shared/book';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
