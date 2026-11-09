import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Avis } from '../../model/avis-interface';
import { AvisService } from '../../service/avis-service';
import { LivreService } from '../../service/livre-service';
import { Livre } from '../../model/livre-interface';

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
  protected livres$!: Observable<Livre[]>;

  private refresh$: Subject<void> = new Subject<void>();

  protected editingAvisId?: number;
  protected formAvisGroup!: FormGroup;
  protected formAvisNoteCtrl  !: FormControl
  protected formAvisLivreCtrl  !: FormControl
  protected formAvisCommCtrl  !: FormControl

  constructor(
    private title: Title,
    private avisService: AvisService,
    private formBuilder: FormBuilder,
  ) { }

  private LivreService: LivreService = inject(LivreService);


  ngOnInit(): void {
    this.title.setTitle("Liste des avis");
    this.formAvisNoteCtrl = this.formBuilder.control("", Validators.required);
    this.formAvisLivreCtrl = this.formBuilder.control("");
    this.formAvisCommCtrl = this.formBuilder.control("");

    this.formAvisGroup = this.formBuilder.group({
      note: this.formAvisNoteCtrl,
      livre: this.formAvisLivreCtrl,
      commentaire: this.formAvisCommCtrl
    });

    this.livres$ = this.refresh$.pipe(
      // On initialise notre Observable
      startWith(null),
      // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
      switchMap(() => {
        return this.LivreService.findAll();
      })
    );

    this.avis$ = this.refresh$.pipe(
      startWith(null),

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
      ...this.formAvisGroup.getRawValue(),
      id: this.editingAvisId
    };

    this.avisService.save(avis).subscribe(() => {
      this.refresh$.next();
    });
      this.editingAvisId = undefined;

    this.formAvisGroup.reset();
  }

  protected editer(avis: Avis) {
    this.editingAvisId = avis.id;
    this.formAvisNoteCtrl.setValue(avis.note);
    this.formAvisLivreCtrl.setValue(avis.livre);
    this.formAvisCommCtrl.setValue(avis.commentaire);

  }

  protected supprimer(avis: Avis) {
    this.avisService.remove(avis).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingAvisId = undefined;
    this.formAvisGroup.reset();
  }

  protected memeId(a: { id: number } | null, b: { id: number } | null): boolean {
    return (a?.id === b?.id) ? true : false;
  }
}



