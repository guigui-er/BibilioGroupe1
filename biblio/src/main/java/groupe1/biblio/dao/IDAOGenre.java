package groupe1.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Genre;

public interface IDAOGenre extends JpaRepository<Genre, Integer> {
    
}
