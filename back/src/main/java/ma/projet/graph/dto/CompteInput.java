package ma.projet.graph.dto;

import lombok.Data;
import ma.projet.graph.entities.TypeCompte;
import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.NotNull;

public class CompteInput {

    private Float solde;
    private String dateCreation;
    private String TypeCompte;

    public Float getSolde() {
        return solde;
    }

    public void setSolde(Float solde) {
        this.solde = solde;
    }

    public String getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(String dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getTypeCompte() {
        return TypeCompte;
    }

    public void setTypeCompte(String typeCompte) {
        TypeCompte = typeCompte;
    }
}
