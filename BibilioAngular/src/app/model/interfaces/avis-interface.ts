export interface Avis {
    id          ?: number;
    note        ?: number;
    commentaire ?: string;
    date        ?: Date;

    livre       ?:Livre; // Pour utiliser les attributs de l'interface
}
