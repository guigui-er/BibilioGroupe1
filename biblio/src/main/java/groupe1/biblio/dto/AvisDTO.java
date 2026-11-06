package groupe1.biblio.dto;

import java.time.LocalDate;

import groupe1.biblio.model.Auteur;
import groupe1.biblio.model.Avis;
import groupe1.biblio.model.Livre;

public class AvisDTO {

    private Integer id;

    private int note;

    private String commentaire;

    private LocalDate date;
    
    private Livre livre;

    private String titreLivre;

    private Auteur auteurLivre;

    private Integer idLivre;

	public static AvisDTO convert(Avis avis) 
    {
        AvisDTO avisDTO     = new AvisDTO();
        avisDTO.id          = avis.getId();
        avisDTO.note        = avis.getNote();
        avisDTO.commentaire = avis.getCommentaire();
        avisDTO.date        = avis.getDate();
        avisDTO.titreLivre  = avis.getLivre().getTitre();
        avisDTO.auteurLivre = avis.getLivre().getAuteur();
        avisDTO.idLivre     = avis.getLivre().getId();
        return avisDTO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public String getTitreLivre() {
        return titreLivre;
    }

    public void setTitreLivre(String titreLivre) {
        this.titreLivre = titreLivre;
    }

    public Auteur getAuteurLivre() {
        return auteurLivre;
    }

    public void setAuteurLivre(Auteur auteurLivre) {
        this.auteurLivre = auteurLivre;
    }

    public Integer getIdLivre() {
        return idLivre;
    }

    public void setIdLivre(Integer idLivre) {
        this.idLivre = idLivre;
    }
}
