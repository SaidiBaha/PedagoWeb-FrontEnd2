import { Component } from '@angular/core';
import { AuthenticationRequest, RegisterRequest } from 'src/app/model/Auth';
import { AuthService } from 'src/app/services/AuthService ';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  authenticationRequest: AuthenticationRequest = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.registerRequest).subscribe(
      (response) => {
        // Handle the response from the backend after successful registration
        console.log('Registration successful:', response);
      },
      (error) => {
        // Handle error response, e.g., display an error message
        console.error('Error during registration:', error);
      }
    );
  }

  authenticate(): void {
    this.authService.authenticate(this.authenticationRequest).subscribe(
      (response) => {
        // Handle the response from the backend after successful authentication
        console.log('Authentication successful:', response);
        // Store the token in the Angular app, if needed
      },
      (error) => {
        // Handle error response, e.g., display an error message
        console.error('Error during authentication:', error);
      }
    );
  }





}
