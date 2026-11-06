package groupe1.biblio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;

@Entity 
@Table (name="editeur")
public class Editeur {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;

    private String pays;

    public Editeur() { }

    
    public Editeur(String nom, String pays) {
        this.nom = nom;
        this.pays = pays;
    }

    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPays() {
        return pays;
    }
    public void setPays(String pays) {
        this.pays = pays;
    } 
    public void setId(Integer id) {
		this.id = id;
	}

    public Integer getId() {
		return id;
	}

    


}
