import { Auteur } from "./auteur";
import { Collection } from "./collection";
import { Editeur } from "./editeur";
import { Genre } from "./genre";

export interface Livre {

id?:number;
titre:string;
resume:string;
annee:number;
auteur:Auteur;
editeur:Editeur;
collection?:Collection;
genre:Genre;

}
