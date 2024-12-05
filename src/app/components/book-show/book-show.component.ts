import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-show',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.css'],
})
export class BookShowComponent implements OnInit {
  book: Book | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); 
      if (id) {
        this.bookService.getBookById(id).subscribe({
          next: (data) => {
            this.book = data;
          },
          error: (err) => {
            console.error('Error:', err);
            this.errorMessage = 'Livre introuvable ou erreur serveur.';
          },
        });
      } else {
        this.errorMessage = 'ID invalide ou manquant dans l\'URL.';
        console.error(this.errorMessage);
      }
    });
  }
  

  goBack(): void {
    this.router.navigate(['/books']);
  }
}
