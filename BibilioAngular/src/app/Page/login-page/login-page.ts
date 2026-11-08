import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  imports: [ReactiveFormsModule,CommonModule],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage implements OnInit {
  protected formLoginGroup!: FormGroup;
  protected formLoginUsernameCtrl!: FormControl;
  protected formLoginPasswordCtrl!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formLoginUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formLoginPasswordCtrl = this.formBuilder.control("", [ Validators.required, Validators.minLength(4) ]);

    this.formLoginGroup = this.formBuilder.group({
      username: this.formLoginUsernameCtrl,
      password: this.formLoginPasswordCtrl
    });
  }

  protected login() {
    this.authService.login(this.formLoginGroup.getRawValue()).subscribe(resp => {
      // On affecte le jeton JWT reçu au service
      this.authService.token = resp.token;

      // Stockage du jeton dans la session du navigateur
      sessionStorage.setItem('token', resp.token);

      // On redirige vers la page de la liste des matières
      this.router.navigate([ 'livre' ]);
    });
  }
}
