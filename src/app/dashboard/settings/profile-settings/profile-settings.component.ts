import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../login/service/auth.service';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  removeUser() {
    this.http.delete(environment.apiUrl + '/v1/user').subscribe(value => this.authService.logout());
  }

  exportData(filename: string = 'exported') {

    this.http.get(environment.apiUrl + '/v1/export', {responseType: 'blob'}).subscribe(
      (response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename) {
          downloadLink.setAttribute('download', filename);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);
      }
    );
  }

  public uploadFile( file: File ) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post(  environment.apiUrl + '/v1/import', formData
      ).subscribe(value => console.log(value))
    ;

  }
}
