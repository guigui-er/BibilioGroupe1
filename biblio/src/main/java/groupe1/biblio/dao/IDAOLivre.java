package groupe1.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Livre;

public interface IDAOLivre extends JpaRepository<Livre, Integer> {

}
