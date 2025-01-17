import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';

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
              private router: Router) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  onSubmit() {
    this.customerpanelApiService.authenticateUser({
      name: this.username,
      password: this.password
    }).subscribe((response) => {
      const token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['/overview']);
    });
  }
}
