package main.java.groupe1.biblio.model;

import java.lang.annotation.Inherited;

@Entity
@Table(name="collection")
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length=100)
    private String nom;

    public Collection () {}

    public Collection(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public String toString() {
        return "Collection [nom=" + nom + "]";
    }

    
    

}
