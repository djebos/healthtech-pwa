import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../login/service/auth.service';

@Component({
  selector: 'app-reminders-root',
  templateUrl: './reminders-root.component.html',
  styleUrls: ['./reminders-root.component.css']
})
export class RemindersRootComponent implements OnInit {

  isGoogleUser = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isGoogleUser = this.authService.getUserFromStorage().authType === 'GOOGLE';
  }
}
