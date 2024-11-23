package ma.projet.graph.repositories;

import ma.projet.graph.entities.Compte;
import ma.projet.graph.entities.TypeCompte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
    List<Compte> findByTypeCompte(TypeCompte typeCompte);



    Optional<Compte> findById(Long id);

    @Query("SELECT SUM(c.solde) FROM Compte c")
    double sumSoldes();
}
