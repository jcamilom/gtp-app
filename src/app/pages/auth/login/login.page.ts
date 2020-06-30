import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { emailRegExp } from 'src/app/pages/auth/register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegExp)]],
      password: ['', Validators.required]
    });
  }

  public submitForm(): void {
    const { email, password } = this.form.value;
    this.authService.login(email.trim(), password).subscribe(
      (resp) => {
        console.log(resp);
      }, (err) => {
        console.log(err);
      }
    );
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

}
