package groupe1.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Avis;

public interface IDAOAvis extends JpaRepository<Avis, Integer> {

}
