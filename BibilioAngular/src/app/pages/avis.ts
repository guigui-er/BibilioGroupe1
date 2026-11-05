import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Avis } from '../model/interfaces/avis-interface';
import { Title } from '@angular/platform-browser';
import { AvisService } from '../services/avis-service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { startWith } from 'rxjs/internal/operators/startWith';

@Component({
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  selector: 'app-avis',
  styleUrl: './avis.css',
  templateUrl: './avis.html',
})
export class AvisPage implements OnInit {

  protected avis$!: Observable<Avis[]>;
  private refresh$: Subject<void> = new Subject<void>(); // Permettra de garder la même référence à l'Observable et alimenter le flux dès qu'un changement sera réalisé

  protected editingAvisId     ?: number; // Pour changer d'avis
  protected formAvisGroup     !: FormGroup;
  protected formAvisNoteCtrl  !: FormControl
  protected formAvisTitreCtrl !: FormControl

  // Constructeur qui servira au ngOnInit
  constructor(
    private title      : Title,
    private avisService: AvisService,
    private formBuilder: FormBuilder
  ) { }

  // Exécution au moment où la page est initialisée
  ngOnInit(): void {
    this.title.setTitle("Avis ⭐");

    // Création du formulaire ReactiveForms
    this.formAvisNoteCtrl = this.formBuilder.control("", Validators.required);

    // Contrôle de la présence d'une note et du titre du livre dans le formulaire Avis
    this.formAvisGroup = this.formBuilder.group({
      note: this.formAvisNoteCtrl,
      titre: this.formAvisTitreCtrl
    });

    this.avis$ = this.refresh$.pipe(
      // On initialise notre Observable
      startWith(null),

      // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
      switchMap(() => {
        return this.avisService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formAvisGroup.invalid) {
      return;
    }

    const avis: Avis = {
      ...this.formAvisGroup.getRawValue(), // On renvoie les valeurs du formulaire avis de base
      id: this.editingAvisId // Id de l'avis qui va subir la modif
    };

    this.avisService.save(avis).subscribe(() => { // On sauvegarde l'avis
      this.refresh$.next(); // Et on renvoie la nouvelle liste d'avis grâce à notre Observable
    });

    this.formAvisGroup.reset(); // Et c'est reparti pour un tour !
  }

}
