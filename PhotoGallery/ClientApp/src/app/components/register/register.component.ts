import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  isRegistered = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
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
          this.isRegistered = true;
        },
        error => {
          this.loading = false;
        });
  }
}
