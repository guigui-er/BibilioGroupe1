
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { InscriptionService } from '../../service/inscription-service';


@Component({
  imports: [ReactiveFormsModule,CommonModule],
  selector: 'app-inscription-page',
  styleUrl: './inscription-page.css',
  templateUrl: './inscription-page.html',
})
export class InscriptionPage implements OnInit{


  protected formSignUpGroup!: FormGroup;
  protected formSignUpUsernameCtrl!: FormControl;
  protected formSignUpPasswordCtrl!: FormControl;

  constructor(
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSignUpUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formSignUpPasswordCtrl = this.formBuilder.control("", [ Validators.required, Validators.minLength(4) ]);

    this.formSignUpGroup = this.formBuilder.group({
      username: this.formSignUpUsernameCtrl,
      password: this.formSignUpPasswordCtrl
    });
  }

  protected signIn() {
    this.inscriptionService.subscribe(this.formSignUpGroup.getRawValue()).subscribe(resp => {

      this.authService.login(this.formSignUpGroup.getRawValue()).subscribe(resp => {
      // On affecte le jeton JWT reçu au service
      this.authService.token = resp.token;

      // Stockage du jeton dans la session du navigateur
      sessionStorage.setItem('token', resp.token);

      // On redirige vers la page de la liste des matières
      this.router.navigate([ 'livre' ]);
    });
    });
  }

}
