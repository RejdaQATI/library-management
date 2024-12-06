import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  authorFilter: string = '';
  genreFilter: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data; 
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter((book) => book.id !== id);
      this.filterBooks(); 
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) => {
      const matchesAuthor = this.authorFilter
        ? book.author.toLowerCase().includes(this.authorFilter.toLowerCase())
        : true;
      const matchesGenre = this.genreFilter
        ? book.genre.toLowerCase().includes(this.genreFilter.toLowerCase())
        : true;

      return matchesAuthor && matchesGenre;
    });
  }
}
