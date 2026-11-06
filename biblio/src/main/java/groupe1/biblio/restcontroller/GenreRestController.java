package groupe1.biblio.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import groupe1.biblio.dao.IDAOGenre;
import groupe1.biblio.model.Genre;

@RestController
@RequestMapping("/api/genre")
@CrossOrigin("*")
public class GenreRestController {

    @Autowired
    IDAOGenre daoGenre;

    @GetMapping
    public List<Genre> afficherTous() {
        return daoGenre.findAll();
    }

    @GetMapping("/{id}")
    public Genre afficherParId(@PathVariable Integer id) {
        return daoGenre.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        daoGenre.deleteById(id);
    }

    @PostMapping
    public Genre ajouter(@RequestBody Genre genre) {
        return daoGenre.save(genre);
    }

    @PutMapping("/{id}")
    public Genre modifier(@PathVariable Integer id, @RequestBody Genre genre) {
        genre.setId(id);
        return daoGenre.save(genre);
    }
} 