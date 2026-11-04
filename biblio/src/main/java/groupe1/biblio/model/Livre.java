package groupe1.biblio.model;

import java.time.LocalDate;
import java.util.Collection;

public class Livre {

    private String titre;
    private String resume;
    private LocalDate annee;
    private Auteur auteur;
    private Editeur editeur;
    private Collection collection;
    private Genre genre;

    public Livre(String titre, String resume, LocalDate annee, Auteur auteur, Editeur editeur, Collection collection,
            Genre genre)
            
            {
        this.titre = titre;
        this.resume = resume;
        this.annee = annee;
        this.auteur = auteur;
        this.editeur = editeur;
        this.collection = collection;
        this.genre = genre;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public LocalDate getAnnee() {
        return annee;
    }

    public void setAnnee(LocalDate annee) {
        this.annee = annee;
    }

    public Auteur getAuteur() {
        return auteur;
    }

    public void setAuteur(Auteur auteur) {
        this.auteur = auteur;
    }

    public Editeur getEditeur() {
        return editeur;
    }

    public void setEditeur(Editeur editeur) {
        this.editeur = editeur;
    }

    public Collection getCollection() {
        return collection;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    

    


}
