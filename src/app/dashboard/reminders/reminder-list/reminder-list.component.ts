import { Component, OnInit } from '@angular/core';
import {Event} from '../data/Event';
import {RemindersService} from '../service/reminders.service';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {
  private events: Event[] = [];
  isLoading = false;

  constructor(private remindersService: RemindersService) { }

  ngOnInit() {
    this.remindersService.getReminders().subscribe((receivedEvents: Event[]) => {
      this.events = receivedEvents;
      if (this.events[0].start.dateTime instanceof Date) {
      console.log('Date');
      }
    });
  }

}
