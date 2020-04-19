import {Component, OnInit} from '@angular/core';
import {Event} from '../data/Event';
import {RemindersService} from '../service/reminders.service';
import {MatSnackBar} from '@angular/material';
import {zip} from 'rxjs';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})
export class ReminderListComponent implements OnInit {
  reminders: Event[] = [];
  isLoading = false;
  selectedRemindersFlags = [];
  selectToolActive = false;

  constructor(private snackBar: MatSnackBar, private remindersService: RemindersService) {
  }

  ngOnInit() {
    this.loadRemindersForToday();
  }

  private loadRemindersForToday() {
    this.isLoading = true;
    this.remindersService.getAllForToday().subscribe((receivedEvents: Event[]) => {
      this.reminders = receivedEvents;
      this.isLoading = false;
    }, erro => {
      this.snackBar.open(`Failed to fetch reminders: ${erro.message}`, '', {
        duration: 5000,
        panelClass: 'snackbar-error'
      });
      this.isLoading = false;
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

  onSelectBtnClick() {
    this.selectToolActive = !this.selectToolActive;
  }

  onDeleteBtnClick() {
    const selectedReminders: Event[] = this.selectedRemindersFlags
      .map((value, index) => value ? this.reminders[index] : null)
      .filter(reminder => reminder != null);
    this.isLoading = true;
    this.selectToolActive = false;
    console.log('Reminders ' + selectedReminders);
    zip(...selectedReminders.map(reminder => this.remindersService.delete(reminder.id)))
      .subscribe(resp => {
        this.snackBar.open('Reminders deleted', 'close', {duration: 3000});
        this.loadRemindersForToday();
      }, err => {
          this.snackBar.open('Error deleting reminder', '', {panelClass: 'snackbar-error', duration: 5000});
          this.isLoading = false;
        }
      );
  }
}
