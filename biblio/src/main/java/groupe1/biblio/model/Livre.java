package groupe1.biblio.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


@Entity
@Table(name="Livre")
public class Livre {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(length = 30,nullable = false,unique = true)
    private String titre;

    @Column(length = 30,nullable = false)
    private String resume;

    private int annee;

    @ManyToOne 
	@JoinColumn(name="auteur",nullable = false)
    private Auteur auteur;

    @ManyToOne  
	@JoinColumn(name="editeur",nullable = false)
    private Editeur editeur;

    @ManyToOne 
    @JoinColumn(name="collection")
    private Collection collection;

    @ManyToOne 
    @JoinColumn(name="genre",nullable = false)
    private Genre genre;


    
    public Livre(Integer id, String titre, String resume, int annee, Auteur auteur, Editeur editeur,
            Collection collection, Genre genre) {
        this.id = id;
        this.titre = titre;
        this.resume = resume;
        this.annee = annee;
        this.auteur = auteur;
        this.editeur = editeur;
        this.collection = collection;
        this.genre = genre;
    }

    public Livre()
    {}

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

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Livre [id=" + id + ", titre=" + titre + ", resume=" + resume + ", annee=" + annee + ", auteur=" + auteur
                + ", editeur=" + editeur + ", collection=" + collection + ", genre=" + genre + "]";
    }

    

    

    


}
