import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { BookService } from '../../services/book.service';
import { Event } from '../../models/event.model';
import { Book } from '../../models/book.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], 
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  booksMap: { [id: string]: Book } = {};

  constructor(private eventService: EventService, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.booksMap = books.reduce((acc, book) => {
        acc[book.id] = book;
        return acc;
      }, {} as { [id: string]: Book });
    });
    
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  getBookTitle(bookId: string): string {
    return this.booksMap[bookId]?.title || 'Livre introuvable';
  }

  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event) => event.id !== id);
    });
  }
}
