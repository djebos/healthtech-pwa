import {Component, OnInit} from '@angular/core';
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

  constructor(private remindersService: RemindersService) {
  }

  ngOnInit() {
    this.remindersService.getReminders().subscribe((receivedEvents: Event[]) => {
      this.events = receivedEvents;
    });
  }

  parseRecurrence(recur: string): string {
    const recurrenceWithoutRRULE = recur.substr(recur.indexOf(':') + 1);
    const recurrenceRuleDetails = recurrenceWithoutRRULE.split(';');
    const freqOption = recurrenceRuleDetails[0].substr(recurrenceRuleDetails[0].indexOf('=') + 1);
    if (freqOption === 'DAILY') {
      return 'Every day';
    } else if (freqOption === 'WEEKLY') {
      const dayOfTheWeek = recurrenceRuleDetails[1].substr(recurrenceRuleDetails[1].indexOf('=') + 1);
      if (dayOfTheWeek.length > 2) {
        console.error('Weekly reminders doesn\'t support more than one day a week');
        return null;
      }
      return 'Every Week on ' + dayOfTheWeek;
    } else {
      return null;
    }
  }

}
