package groupe1.biblio.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import groupe1.biblio.model.Avis;

public interface AvisDAO extends JpaRepository<Avis, Integer> {

    // Find 

    public List<Avis> findByLivreId(Integer livreId);

    public List<Avis> findByNoteGreaterThanEqual(int note);

    public List<Avis> findByNoteLowerThanEqual(int note);

    public List<Avis> findByDateBetween(java.time.LocalDate dateDebut, java.time.LocalDate dateFin);

    public List<Avis> findByDateBefore(java.time.LocalDate dateFin);

    public List<Avis> findByDateAfter(java.time.LocalDate dateDebut);

    // Count

    public Integer countByLivreTitreContaining(String recherche);

    public Integer countByLivreAuteurContaining(String recherche);
}
