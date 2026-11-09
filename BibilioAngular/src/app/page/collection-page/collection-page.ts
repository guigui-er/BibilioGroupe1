import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, startWith, Subject, switchMap } from "rxjs";
import { Collection } from "../../model/collection";
import { CollectionService } from "../../service/collection-service";
import { Title } from "@angular/platform-browser";

@Component({
  imports: [
    ReactiveFormsModule, AsyncPipe
  ],
  selector: 'app-collection-page',
  styleUrl: './collection-page.css',
  templateUrl: './collection-page.html',
})
export class CollectionPage implements OnInit {

  protected collections$!: Observable<Collection[]>;
  private refresh$: Subject<void> = new Subject<void>();

  protected editingCollectionId?: number;
  protected formCollectionGroup!: FormGroup;
  protected formCollectionNomCtrl!: FormControl;

  constructor(
    private title: Title, 
    private collectionService : CollectionService,
    private formBuilder : FormBuilder,
  ){}

  ngOnInit(): void {
    this.title.setTitle("Liste des collections");
    this.formCollectionNomCtrl = this.formBuilder.control("", Validators.required);

    this.formCollectionGroup = this.formBuilder.group({
      nom: this.formCollectionNomCtrl
    });

    this.collections$ = this.refresh$.pipe(
      startWith(null),

      switchMap(() => {
        return this.collectionService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formCollectionGroup.invalid) {
      return;
    }
    const collection: Collection = {
      ...this.formCollectionGroup.getRawValue(),
      id: this.editingCollectionId
    };

    this.collectionService.save(collection).subscribe(() => {
      this.refresh$.next();
    });
    this.editingCollectionId = undefined;

    this.formCollectionGroup.reset();
  }

  protected editer(collection: Collection) {
    this.editingCollectionId = collection.id;
    this.formCollectionNomCtrl.setValue(collection.nom);
  }

  protected supprimer(collection: Collection) {
    this.collectionService.remove(collection).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingCollectionId = undefined;
    this.formCollectionGroup.reset();
  }
}

