import React from "react";
import { useQuery, gql } from "@apollo/client";
import DeleteCompte from "./DeleteComptes";

const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      typeCompte
    }
  }
`;

const ListComptes = () => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>Erreur : {error.message}</p>;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", margin: "20px" }}>
            <h2>Liste des Comptes</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ddd", padding: "10px" }}>ID</th>
                    <th style={{ border: "1px solid #ddd", padding: "10px" }}>Solde</th>
                    <th style={{ border: "1px solid #ddd", padding: "10px" }}>Date de Création</th>
                    <th style={{ border: "1px solid #ddd", padding: "10px" }}>Type de Compte</th>
                    <th style={{ border: "1px solid #ddd", padding: "10px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.allComptes.map((compte) => (
                    <tr key={compte.id}>
                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>{compte.id}</td>
                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>{compte.solde}</td>
                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>{compte.dateCreation}</td>
                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>{compte.typeCompte}</td>
                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                            <DeleteCompte id={compte.id} refetch={refetch} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListComptes;
