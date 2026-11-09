package groupe1.biblio.dto;

import org.springframework.beans.BeanUtils;

import groupe1.biblio.model.Collection;

public class CollectionDTO {

    private Integer id;
    private String nom;

    public CollectionDTO () {}

    public CollectionDTO(Integer id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    

    

}
