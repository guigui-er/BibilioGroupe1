import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { startWith } from 'rxjs/internal/operators/startWith';
import { Avis } from '../../model/avis-interface';
import { AvisService } from '../../service/avis-service';

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
  private refresh$: Subject<void> = new Subject<void>();

  protected editingAvisId?: number;
  protected formAvisGroup!: FormGroup;
  protected formAvisNoteCtrl  !: FormControl

  constructor(
    private title: Title, 
    private avisService : AvisService,
    private formBuilder : FormBuilder,
  ){}

  ngOnInit(): void {
    this.title.setTitle("Liste des avis");
    this.formAvisNoteCtrl = this.formBuilder.control("", Validators.required);

    this.formAvisGroup = this.formBuilder.group({
      note: this.formAvisNoteCtrl,
    });

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

    this.formAvisGroup.reset();
  }

  protected editer(avis: Avis) {
    this.editingAvisId = avis.id;
    this.formAvisNoteCtrl.setValue(avis.note);
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
}



