import {Component, OnInit} from '@angular/core';
import {MeasurementType} from '../../data/MeasurementType';
import {EnumUtils} from '../../data/EnumUtils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateReminder} from '../data/CreateReminder';
import {RemindersService} from '../service/reminders.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {
  remindersTypeSelected: MeasurementType[] = [MeasurementType.PULSE];
  currentDate: Date = new Date();
  createReminderForm: FormGroup = new FormGroup({
      description: new FormControl('', {validators: [Validators.minLength(3)]}),
      dateTime: new FormControl(this.currentDate, {validators: Validators.required}),
      recurrence: new FormControl('', {validators: []})
    }
  );

  constructor(private remindersService: RemindersService, private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  createReminder() {
    const newReminder  = new CreateReminder();
    newReminder.recurrence.push(this.createReminderForm.get('recurrence').value);
    newReminder.colorId = '1';
    newReminder.description = this.createReminderForm.get('description').value;
    newReminder.title = 'Measure Pressure';
    newReminder.startTime = this.datePipe.transform(this.createReminderForm.get('dateTime').value, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
    console.log('Sending dateTime: '  + newReminder.startTime);
    this.remindersService.createReminder(newReminder).subscribe(createdReminder => {
      console.log('Created reminder: ' + createdReminder);
      this.createReminderForm.reset();
    });
  }

  onReminderTypeClick(type: string) {
    const index = this.remindersTypeSelected.indexOf(EnumUtils.toMeasurementType(type));
    if (index !== -1) {
      this.remindersTypeSelected.splice(index, 1);
    } else {
      this.remindersTypeSelected.push(EnumUtils.toMeasurementType(type));
    }
  }

  findSelectedReminderType(type: string): boolean {
    return this.remindersTypeSelected.includes(EnumUtils.toMeasurementType(type));
  }
}
