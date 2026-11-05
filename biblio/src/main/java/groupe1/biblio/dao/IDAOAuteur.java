package groupe1.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Auteur;


public interface IDAOAuteur extends JpaRepository<Auteur, Integer> {

} 
