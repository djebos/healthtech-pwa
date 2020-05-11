import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../login/service/auth.service';
import {UserProfile} from '../../../data/UserProfile';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  currentDate = new Date();
  srcResult: any;
  user: UserProfile = null;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit() {
    this.authService.getCurrUserInfo().subscribe(user => this.user = user);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.srcResult = e.target.result;
    };

    reader.readAsDataURL(inputNode.files[0]);
  }

  updateProfile() {
    this.http.put<UserProfile>(environment.apiUrl + '/v1/user', this.user).subscribe(user => {
      this.user = user;
    });
  }
}
