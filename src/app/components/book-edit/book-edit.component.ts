import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publicationDate: ['', Validators.required],
      status: ['', Validators.required],
      summary: [''],
      amazon: [''],
      library: [''],
      chapters: [''],
    });
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate,
          status: book.status,
          summary: book.summary,
          amazon: book.platforms.amazon,
          library: book.platforms.library,
          chapters: book.chapters,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookId = this.route.snapshot.paramMap.get('id');
      if (bookId) {
        const updatedBook = {
          ...this.bookForm.value,
          platforms: {
            amazon: this.bookForm.value.amazon,
            library: this.bookForm.value.library,
          },
        };

        this.bookService.updateBook(bookId, updatedBook).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
