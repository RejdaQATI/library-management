import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
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

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }


  deleteEvent(id: string | undefined): void {
    if (!id) {
      console.error('ID not defined');
      return;
    }
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event) => event.id !== id);
    });
  }
  
}
