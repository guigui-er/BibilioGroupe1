import { Component, OnInit } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Editeur } from '../../model/editeur';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EditeurService } from '../../service/editeur-service';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-editeur-page',
  styleUrl: './editeur-page.css',
  templateUrl: './editeur-page.html',
})
export class EditeurPage implements OnInit{

  protected editeur$!: Observable<Editeur[]>; 
  private refresh$: Subject<void> = new Subject<void>();

  protected editingEditeurId?: number;
  protected formEditeurGroup!: FormGroup;
  protected formEditeurNomCtrl!: FormControl;
  protected formEditeurPaysCtrl!: FormControl;

  constructor(
    private title: Title, 
    private editeurService : EditeurService,
    private formsBuilder : FormBuilder,
  ){}

  ngOnInit(): void {
    this.title.setTitle("Editeurs"); 

    this.formEditeurNomCtrl = this.formsBuilder.control("", Validators.required);
    this.formEditeurPaysCtrl = this.formsBuilder.control("", Validators.required);

    this.formEditeurGroup = this.formsBuilder.group({
      nom: this.formEditeurNomCtrl,
      pays: this.formEditeurPaysCtrl
    });

    this.editeur$ = this.refresh$.pipe(
      startWith(null),

      switchMap(() => {
        return this.editeurService.findAll();
      })
    );
  }

  protected ajouterOuModifier(){
    if (this.formEditeurGroup.invalid){
      return;
    }

    const editeur : Editeur = {
      ...this.formEditeurGroup.getRawValue(),
      id: this.editingEditeurId
    };

    this.editeurService.save(editeur).subscribe(() => {
      this.refresh$.next();
    });
    this.editingEditeurId = undefined;

    this.formEditeurGroup.reset
  }
  protected editer(editeur: Editeur){
    this.editingEditeurId = editeur.id;
    this.formEditeurNomCtrl.setValue(editeur.nom);
    this.formEditeurPaysCtrl.setValue(editeur.pays);
  }

  protected supprimer(editeur: Editeur){
    console.log('à supprimer :', editeur);
    this.editeurService.remove(editeur).subscribe(()=> {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingEditeurId = undefined;
    this.formEditeurGroup.reset();
  }

}
