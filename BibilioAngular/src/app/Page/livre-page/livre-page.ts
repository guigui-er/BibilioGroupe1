

import { Genre } from './../../model/genre';
import { Auteur } from './../../model/auteur';
import { Editeur } from './../../model/editeur';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Livre } from '../../model/livre';
import { LivreService } from '../../service/livre-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AuteurService } from '../../service/auteur-service';
import { EditeurService } from '../../service/editeur-service';
import { GenreService } from '../../service/genre-service';
import { Collection } from '../../model/collection';
import { CollectionService } from '../../service/collection-service';

@Component({
  imports: [ReactiveFormsModule,CommonModule,AsyncPipe],
  selector: 'app-livre-page',
  styleUrl: './livre-page.css',
  templateUrl: './livre-page.html',
})
export class LivrePage implements OnInit {

    protected Livres!:Livre [];
    protected Livres$!: Observable<Livre[]>;

    protected Editeurs$!: Observable<Editeur[]>;
    protected Auteurs$!: Observable<Auteur[]>;
    protected Genres$!: Observable<Genre[]>;
    protected Collections$!: Observable<Collection[]>;

    private refresh$: Subject<void> = new Subject<void>();

    protected editingLivreId?: number;
    protected formLivreGroup!: FormGroup;

    protected formTitreCtrl!: FormControl;
    protected formResumeCtrl!: FormControl;
    protected formAnneeCtrl!: FormControl;
    protected formAuteurCtrl!: FormControl;
    protected formEditeurCtrl!: FormControl;
    protected formCollectionCtrl!: FormControl;
    protected formGenreCtrl!: FormControl;

    constructor(private formBuilder:FormBuilder,private title: Title){


    }

    // Injection des services
    private LivreService:LivreService = inject(LivreService);
    private AuteurService:AuteurService = inject(AuteurService);
    private EditeurService:EditeurService = inject(EditeurService);
    private GenreService:GenreService = inject(GenreService);
    private CollectionService:CollectionService = inject(CollectionService);


    // Cette méthode s'exécute à l'initialisation du composant
    ngOnInit(): void {

      this.title.setTitle("Livre List");
      this.formTitreCtrl = this.formBuilder.control("", Validators.required);
      this.formResumeCtrl = this.formBuilder.control("", Validators.required);
      this.formAnneeCtrl= this.formBuilder.control("", Validators.required);
      this.formAuteurCtrl = this.formBuilder.control("", Validators.required);
      this.formEditeurCtrl = this.formBuilder.control("", Validators.required);
      this.formCollectionCtrl = this.formBuilder.control("");
      this.formGenreCtrl = this.formBuilder.control("", Validators.required);

      this.formLivreGroup = this.formBuilder.group({
        titre: this.formTitreCtrl,
        resume: this.formResumeCtrl,
        annee: this.formAnneeCtrl,
        auteur: this.formAuteurCtrl,
        editeur: this.formEditeurCtrl,
        collection: this.formCollectionCtrl,
        genre : this.formGenreCtrl
      });

      // Recuperer Liste des Livres/Auteur/Editeur/Genre/Collection pour tableau et affichage

      this.Livres$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.LivreService.findAll();
        })
      );
      this.Auteurs$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.AuteurService.findAll();
        })
      );
      this.Editeurs$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.EditeurService.findAll();
        })
      );
      this.Genres$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.GenreService.findAll();
        })
      );

      this.Collections$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.CollectionService.findAllObs();
        })
      );

    }

    protected ajouterLivre() {

      if (this.formLivreGroup.invalid) {
        return;
      }

      const livre: Livre = {
        ...this.formLivreGroup.getRawValue(),
        id: this.editingLivreId
      };


      //this.LivreService.addObs(livre).subscribe(() => {
          //this.refresh$.next();});

      this.LivreService.save(livre).subscribe(() => {
          this.refresh$.next();});

      this.editingLivreId = undefined;

      this.formLivreGroup.reset();
    }


    protected editerMatiere(livre: Livre) {
      this.editingLivreId = livre.id;
      this.formTitreCtrl.setValue(livre.titre);
      this.formResumeCtrl.setValue(livre.resume);
      this.formAnneeCtrl.setValue(livre.annee);
      this.formAuteurCtrl.setValue(livre.auteur);
      this.formEditeurCtrl.setValue(livre.editeur);
      this.formCollectionCtrl.setValue(livre.collection);
      this.formGenreCtrl.setValue(livre.genre);
    }


    protected supprimerLivre(livre: Livre) {

       this.LivreService.remove(livre).subscribe(()=>{
        this.refresh$.next();
        });
      }

    protected annulerEdition() {
    this.editingLivreId = undefined;
    this.formLivreGroup.reset();
  }

    protected memeId(a: {id:number} | null,b: {id:number} | null):boolean {
      return (a?.id===b?.id)? true: false;
    }
}
