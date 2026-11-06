package groupe1.biblio.dto;

public class GenreDTO {

    private Integer id;
    private String nom;

    public GenreDTO() {}

    public GenreDTO(Integer id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
