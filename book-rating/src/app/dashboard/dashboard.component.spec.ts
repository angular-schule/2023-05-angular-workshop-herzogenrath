import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';

// Unit Test weil Abhängigkeit ersetzt
@Component({
  selector: 'app-book',
  standalone: true,
  template: '<h1>🙈</h1>'
})
export class DummyBookComponent {
  @Input() book?: BookComponent
}


fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {

    const bookRatingMock = {
      rateUp: (book: Book) => book
    }

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }]
    })
    .overrideComponent(DashboardComponent, {
      // remove: { imports: [BookComponent] },
      // add: { imports: [DummyBookComponent] }

      set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },

    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward all calls to BookRatingService', () => {

    const rs = TestBed.inject(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    const book = { } as Book;
    component.doRateUp(book)

    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
