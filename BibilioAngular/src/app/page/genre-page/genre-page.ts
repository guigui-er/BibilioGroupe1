import { Component, OnInit } from '@angular/core';
import { Genre } from '../../model/genre';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { GenreService } from '../../service/genre-service';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-genre-page',
  styleUrl: './genre-page.css',
  templateUrl: './genre-page.html',
})
export class GenrePage implements OnInit{
  protected genres$!: Observable<Genre[]>;
  private refresh$: Subject<void> = new Subject<void>(); // Permettra de garder la même référence à l'Observable et alimenter le flux dès qu'un changement sera réalisé

  protected editingGenreId?: number;
  protected formGenreGroup!: FormGroup;
  protected formGenreLibelleCtrl!: FormControl

  constructor(
    private title: Title,
    private genreService: GenreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Liste des matières");
    this.formGenreLibelleCtrl = this.formBuilder.control("", Validators.required);

    this.formGenreGroup = this.formBuilder.group({
      libelle: this.formGenreLibelleCtrl
    });

    this.genres$ = this.refresh$.pipe(
      // On initialise notre Observable
      startWith(null),

      // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
      switchMap(() => {
        return this.genreService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formGenreGroup.invalid) {
      return;
    }
    const genre: Genre = {
      ...this.formGenreGroup.getRawValue(),
      id: this.editingGenreId
    };

    this.genreService.save(genre).subscribe(() => {
      this.refresh$.next();
    });

    this.formGenreGroup.reset();
  }

  protected editer(genre: Genre) {
    this.editingGenreId = genre.id;
    this.formGenreLibelleCtrl.setValue(genre.libelle);
  }

  protected supprimer(genre: Genre) {
    this.genreService.remove(genre).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingGenreId = undefined;
    this.formGenreGroup.reset();
  }
}

