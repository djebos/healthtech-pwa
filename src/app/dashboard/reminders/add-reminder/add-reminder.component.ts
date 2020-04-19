import {Component, OnInit} from '@angular/core';
import {MeasurementType} from '../../data/MeasurementType';
import {EnumUtils} from '../../data/EnumUtils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateReminder} from '../data/CreateReminder';
import {RemindersService} from '../service/reminders.service';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material';

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

  constructor(private remindersService: RemindersService, private datePipe: DatePipe, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  createReminder() {
    const newReminder = new CreateReminder();
    if (this.createReminderForm.get('recurrence').value !== '') {
      newReminder.recurrence = [this.createReminderForm.get('recurrence').value];
    }
    if (this.remindersTypeSelected.length > 1) {
      newReminder.colorId = '6';
    } else {
      // google calendar doesn't have 0 color
      newReminder.colorId = (Object.keys(MeasurementType).indexOf(this.getEnumName()) + 1).toString();
    }
    newReminder.description = this.createReminderForm.get('description').value;
    newReminder.title = this.getTitle();
    newReminder.startTime = this.datePipe.transform(this.createReminderForm.get('dateTime').value, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
    this.remindersService.create(newReminder).subscribe(createdReminder => {
      this.createReminderForm.reset();
      this.snackBar.open(`Reminder created: ${createdReminder.id}`, '', {duration: 3000});
    }, error => {
      this.snackBar.open(`Error creating reminder: ${error.message}`, '', {panelClass: 'snackbar-error', duration: 5000});
    });
  }

  private getEnumName(): string {
    const enumName = this.remindersTypeSelected[0].valueOf().toUpperCase();
    return enumName === 'TEMP' ? 'TEMPERATURE' : enumName;
  }

  private getTitle() {
    const selectedReminderTypes = this.remindersTypeSelected.map(value => value.toString())
      .reduce((previousValue, currentValue) => previousValue.concat(', ' + currentValue));
    return 'Measure ' + selectedReminderTypes;
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
