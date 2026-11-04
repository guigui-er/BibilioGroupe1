package groupe1.biblio.dto;

import org.springframework.beans.BeanUtils;

import groupe1.biblio.model.Collection;

public class CollectionDTO {

    private Integer id;
    private String nom;

    public static CollectionDTO convert (Collection collection)
    {
        CollectionDTO collectionDto = new CollectionDTO();
        BeanUtils.copyProperties(collection, collectionDto);
        return collectionDto;
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
