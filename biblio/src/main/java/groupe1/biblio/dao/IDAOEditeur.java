package groupe1.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Editeur;

public interface IDAOEditeur extends JpaRepository<Editeur, Integer> {

}
