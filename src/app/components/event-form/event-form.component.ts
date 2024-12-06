import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent], 
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  books: Book[] = [];
  isEditMode = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      bookOfTheMonthId: ['', Validators.required],
      guests: [''],
      agenda: [''],
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });

    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.eventService.getEventById(this.eventId).subscribe((event) => {
        this.eventForm.patchValue({
          ...event,
          guests: event.guests.join(', '),
          agenda: event.agenda.join(', '),
        });
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData = {
        ...this.eventForm.value,
        guests: this.eventForm.value.guests.split(',').map((g: string) => g.trim()),
        agenda: this.eventForm.value.agenda.split(',').map((a: string) => a.trim()),
      };

      if (this.isEditMode && this.eventId) {
        this.eventService.updateEvent(this.eventId, eventData).subscribe(() => {
          this.router.navigate(['/events']);
        });
      } else {
        this.eventService.addEvent(eventData).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }
    }
  }
}
