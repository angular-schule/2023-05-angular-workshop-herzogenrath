import { Component } from '@angular/core';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { Book } from '../shared/book';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  books: Book[] = [{
    isbn: '000',
    title: 'Angular',
    description: 'Tolles Buch',
    rating: 5
  }, {
    isbn: '111',
    title: 'AngularJs',
    description: 'Altes Buch',
    rating: 3
  }, {
    isbn: '222',
    title: 'jQuery',
    description: 'Super altes Buch',
    rating: 1
  }];
}
