import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Auteur } from '../../model/auteur';
import { AuteurService } from '../../service/auteur-service';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe],
  selector: 'app-auteur-page',
  styleUrl: './auteur-page.css',
  templateUrl: './auteur-page.html',
})
export class AuteurPage {

    protected auteurs$!: Observable<Auteur[]>;
    private refresh$: Subject<void> = new Subject<void>();
    
    protected editingAuteurId?: number;
    protected formAuteurGroup!: FormGroup;
    protected formAuteurNomCtrl!: FormControl;
    protected formAuteurPrenomCtrl!: FormControl;
    protected formAuteurNationaliteCtrl!: FormControl;

    constructor(
      private title: Title,
      private auteurService : AuteurService,
      private formBuilder : FormBuilder
    ){}

    ngOnInit(): void{
      this.title.setTitle("Liste des Auteurs");

      // Création du formulaire ReactiveForms
      this.formAuteurNomCtrl = this.formBuilder.control("", Validators.required);
      this.formAuteurPrenomCtrl = this.formBuilder.control("", Validators.required);
      this.formAuteurNationaliteCtrl = this.formBuilder.control("", Validators.required);

      this.formAuteurGroup = this.formBuilder.group({
        nom: this.formAuteurNomCtrl,
        prenom: this.formAuteurPrenomCtrl,
        nationalite: this.formAuteurNationaliteCtrl
      });

      this.auteurs$ = this.refresh$.pipe(
      startWith(null),

      switchMap(() => {
        return this.auteurService.findAll();
      })
     )
  }

    
  protected ajouterOuModifierAuteur() {
  if (this.formAuteurGroup.invalid) {
        return;
      }
      const auteur: Auteur = {
        ...this.formAuteurGroup.getRawValue(),
        id: this.editingAuteurId
      };

      this.auteurService.save(auteur).subscribe(() => {
        this.refresh$.next();
      });
    
    this.formAuteurGroup.reset();
  }

  protected editerAuteur(auteur: Auteur) {
    this.editingAuteurId = auteur.id;
    this.formAuteurNomCtrl.setValue(auteur.nom);
    this.formAuteurPrenomCtrl.setValue(auteur.prenom);
    this.formAuteurNationaliteCtrl.setValue(auteur.nationalite);
  }

  protected supprimerAuteur(auteur: Auteur) {
    this.auteurService.removeAuteur(auteur).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingAuteurId = undefined;
    this.formAuteurNomCtrl.setValue("");
    this.formAuteurPrenomCtrl.setValue("");
    this.formAuteurNationaliteCtrl.setValue("");
  }

}
