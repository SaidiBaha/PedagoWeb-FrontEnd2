import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest, RegisterRequest } from 'src/app/model/Auth';
import { Role } from 'src/app/model/User';
import { AuthService } from 'src/app/services/AuthService ';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  showRegisterForm: boolean = true;

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

  constructor(private authService: AuthService ,private router: Router) {}

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

 /* authenticate(): void {
    this.authService.authenticate(this.authenticationRequest).subscribe(
      (response) => {
        // Handle the response from the backend after successful authentication
        console.log('Authentication successful:', response);
        // Store the token in the Angular app, if needed
        const user = response.user;

        if (user.role === Role.ADMIN) {
          this.router.navigate(['/listUser']); // Redirection vers la page d'accueil de l'administrateur
        } else if (user.role === Role.USER) {
          this.router.navigate(['/listTh']); // Redirection vers la page d'accueil de l'utilisateur
        }

      },
      (error) => {
        // Handle error response, e.g., display an error message
        console.error('Error during authentication:', error);
      }
    );
  }*/

  /*

  login(): void {
    this.authService.authenticate(this.authenticationRequest).subscribe(
      () => {
        // Check user role and redirect accordingly
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin-home']); // Replace with your admin home route
        } else if (this.authService.isUser()) {
          this.router.navigate(['/user-home']); // Replace with your user home route
        } else {
          // Handle unexpected role
        }
      },
      (error) => {
        console.error('Error during authentication:', error);
      }
    );
  }*/

  /*

login(): void {
    this.authService.authenticate(this.authenticationRequest).subscribe(
      (response) => {
        // Handle successful authentication
        console.log('Authentication successful:', response);

        // Check the user's role from the token
        if (response && response.token) {
          const tokenPayload = this.authService.getDecodedToken(response.token);
          if (tokenPayload.role === 'ADMIN') {
            // Redirect to admin homepage
            this.router.navigate(['/admin-home']);
          } else if (tokenPayload.role === 'USER') {
            // Redirect to user homepage
            this.router.navigate(['/user-home']);
          }
        }
      },
      (error) => {
        // Handle error response, e.g., display an error message
        console.error('Error during authentication:', error);
      }
    );
  }*/

  authenticate(): void {
    this.authService.authenticate(this.authenticationRequest).subscribe(
      (response) => {
       
        console.log('Authentication successful:', response);
        // Redirect based on role
        if (this.authService.isAdmin()) {
          this.router.navigate(['/listUser']); // Redirect to admin home
        } else {
          this.router.navigate(['/listTh']); // Redirect to user home
        }
      },
      (error) => {
        // Handle error response, e.g., display an error message
        console.error('Error during authentication:', error);
      }
    );
  }

}
