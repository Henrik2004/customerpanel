import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected username = '';
  protected password = '';

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private router: Router,
              private toastr: ToastrService) {
  }

  onSubmit() {
    this.customerpanelApiService.authenticateUser({
      name: this.username,
      password: this.password
    }).subscribe((response) => {
      if (response.token) {
        this.customerpanelApiService.token = response.token;
        this.customerpanelApiService.user = response.userId;
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('tokenTime', new Date().getTime().toString());
        this.router.navigate(['/overview']);
        this.toastr.success('Login successful');
      }
    });
  }
}
