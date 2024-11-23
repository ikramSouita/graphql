package ma.projet.graph.controllers;

import lombok.AllArgsConstructor;
import ma.projet.graph.dto.CompteInput;
import ma.projet.graph.entities.Compte;
import ma.projet.graph.entities.TypeCompte;
import ma.projet.graph.repositories.CompteRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class CompteControllerGraphQL {

    private final CompteRepository compteRepository;

    /**
     * Query to retrieve all accounts.
     */
    @QueryMapping
    public List<Compte> allComptes() {
        return compteRepository.findAll();
    }

    /**
     * Query to retrieve a single account by ID.
     *
     * @param id The ID of the account.
     * @return The account if found, otherwise throws an exception.
     */
    @QueryMapping
    public Compte compteById(@Argument Long id) {
        return compteRepository.findById(id).orElseThrow(() ->
                new RuntimeException(String.format("Compte %s not found", id))
        );
    }

    /**
     * Mutation to save a new account.
     *
     * @param compteInput Input data for the account.
     * @return The saved account.
     */
    @MutationMapping
    public Compte saveCompte(@Argument CompteInput compteInput) {
        Compte compte = new Compte();
        compte.setSolde(compteInput.getSolde());
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = dateFormat.parse(compteInput.getDateCreation());
            compte.setDateCreation(date);
        } catch (ParseException e) {
            throw new RuntimeException("Invalid date format: " + compteInput.getDateCreation(), e);
        }
        compte.setTypeCompte(TypeCompte.valueOf(compteInput.getTypeCompte().toUpperCase()));
        return compteRepository.save(compte);
    }
    @QueryMapping
    public List<Compte> comptesParType(@Argument String type) {
        TypeCompte typeCompte = TypeCompte.valueOf(type.toUpperCase());
        return compteRepository.findByTypeCompte(typeCompte);
    }


    /**
     * Query to calculate total balance statistics.
     *
     * @return A map containing the total count, sum, and average balance.
     */
    @QueryMapping
    public Map<String, Object> totalSolde() {
        long count = compteRepository.count();
        double sum = compteRepository.sumSoldes();
        double average = count > 0 ? sum / count : 0;

        return Map.of(
                "count", count,
                "sum", sum,
                "average", average
        );
    }
    @MutationMapping
    public boolean deleteCompte(@Argument Long id) {
        if (compteRepository.existsById(id)) {
            compteRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
