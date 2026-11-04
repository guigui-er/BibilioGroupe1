package groupe1.biblio.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Avis : attributs (note, commentaire, date, livre)
@Entity
@Table(name="avis")
public class Avis {

    @Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name="id", nullable=false)
    private Integer id;

    @ManyToOne // Avis peut être associé à un seul livre et un livre peut avoir plusieurs avis
	@JoinColumn(name="livre")
    protected Livre livre;

    @Column(name="note", nullable=false)
    protected int note;

    @Column(name="commentaire", length=420)
    protected String commentaire;

    @Column(name="date")
    protected LocalDate date;

    // Constructeur vide JPA
    public Avis() {}

    public Avis(int note, String commentaire, LocalDate date, Livre livre) {
        this.note        = note;
        this.commentaire = commentaire;
        this.date        = date;
        this.livre       = livre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public int getNote() {
        return note;
    }

    public void setNote(int note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }



}
