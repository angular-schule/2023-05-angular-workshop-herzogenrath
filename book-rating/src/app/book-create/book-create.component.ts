import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCreateComponent {

  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    description: new FormControl('', {
      nonNullable: true
    })
  });

  c = this.bookForm.controls;

  isInvalid(control: FormControl) {
    return control.invalid && control.touched;
  }

  hasError(control: FormControl, errorCode: string) {
    return control.invalid &&
      control.touched &&
      control.hasError(errorCode);
  }

  submitForm() {
    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      rating: 1
    }

    // 1. Erstelle eine Ereignis mit dem Namen create (Payload Buch)
    // 2. Reiche das Buch weiter
    // 3. Abonniere dich auf das Ereignis in Dashboard
    // 4. Füge das Buch dem Array hinzu

    this.bookForm.reset();
  }
}
