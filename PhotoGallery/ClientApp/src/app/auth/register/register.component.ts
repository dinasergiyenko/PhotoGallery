import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@app/users/shared/user.model';

@Component({
  selector: 'pg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      fieldOfActivity: ['']
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.registerForm.valid) {
      return;
    }

    this.loading = true;

    const user = new User(
      this.formControls.username.value,
      this.formControls.password.value,
      this.formControls.firstName.value,
      this.formControls.lastName.value,
      this.formControls.email.value,
      this.formControls.city.value,
      this.formControls.fieldOfActivity.value
    );

    this.authenticationService.register(user)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }
}
