import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/service/auth-service.service';
import {UserProfile} from '../../data/UserProfile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: UserProfile;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

}
