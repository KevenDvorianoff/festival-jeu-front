import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  confirmForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get username() {
    return this.confirmForm.value.username;
  }

  get password() {
    return this.confirmForm.value.password;
  }

  error?: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/festivals'])
      },
      (e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.error = 'Mauvaise combinaison identifiant/mot de passe.';
        }
        else {
          this.error = 'Impossible de se connecter.';
        }
      }
    );
  }

}
