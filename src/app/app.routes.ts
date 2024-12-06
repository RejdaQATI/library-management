import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookShowComponent } from './components/book-show/book-show.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [

    { path: '', component: BookListComponent }, 
    { path: 'books/add', component: BookFormComponent },
    { path: 'books/edit/:id', component: BookEditComponent },
    { path: 'books/:id', component: BookShowComponent }, 
    { path: 'events', component: EventListComponent },
    { path: 'events/add', component: EventFormComponent },
    { path: 'events/edit/:id', component: EventFormComponent },
];

