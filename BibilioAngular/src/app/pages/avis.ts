import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

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

  protected editingAvisId?: number;
  protected formAvisGroup!: FormGroup;
  protected formAvisLibelleCtrl!: FormControl
  

}
