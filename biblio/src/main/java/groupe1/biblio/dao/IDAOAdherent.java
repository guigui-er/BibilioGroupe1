package groupe1.biblio.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Adherent;


public interface IDAOAdherent extends JpaRepository<Adherent, Integer> {

    public Optional<Adherent> findByUsername(String username);

} 
