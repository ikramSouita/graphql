package ma.projet.graph.entities;

import jakarta.persistence.*;
import java.util.Date;
@Entity
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float solde;

    @Temporal(TemporalType.DATE)
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // Assure que la colonne ne peut pas être NULL dans la base de données
    private TypeCompte typeCompte;

    // Constructeur par défaut (nécessaire pour JPA)
    public Compte() {}

    // Constructeur avec paramètres
    public Compte(Long id, Float solde, Date dateCreation, TypeCompte typeCompte) {
        this.id = id;
        this.solde = solde;
        this.dateCreation = dateCreation;
        this.typeCompte = typeCompte;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getSolde() {
        return solde;
    }

    public void setSolde(Float solde) {
        this.solde = solde;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public TypeCompte getTypeCompte() {
        return typeCompte;
    }

    public void setTypeCompte(TypeCompte typeCompte) {
        this.typeCompte = typeCompte;
    }
}
