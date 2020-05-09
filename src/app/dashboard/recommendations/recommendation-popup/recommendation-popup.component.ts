import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recommendation-popup',
  templateUrl: './recommendation-popup.component.html',
  styleUrls: ['./recommendation-popup.component.css']
})
export class RecommendationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<RecommendationPopupComponent>) {
  }

  ngOnInit() {
  }

  navigateToReminders(reminder: string) {
    this.dialogRef.close();
    this.router.navigate(['/reminders/add-reminder']);
  }
}
