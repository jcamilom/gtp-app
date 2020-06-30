import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

// tslint:disable-next-line: max-line-length
const emailRegExp: RegExp = /^(([^<>()\[\]\\.,;:\s@'+|={}`"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegExp)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submitForm(): void {
    const { email, password } = this.form.value;
    this.authService.register(email.trim(), password).subscribe(
      (resp) => {
        console.log(resp);
      }, (err) => {
        console.error(err);
      }
    );
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

}
