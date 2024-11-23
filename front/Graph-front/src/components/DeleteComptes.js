import React from "react";
import { useMutation, gql } from "@apollo/client";

// Mutation GraphQL pour supprimer un compte
const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;

const DeleteCompte = ({ id, refetch }) => {
    const [deleteCompte, { loading }] = useMutation(DELETE_COMPTE, {
        onCompleted: refetch, // Rafraîchir la liste après suppression
    });

    const handleDelete = () => {
        deleteCompte({ variables: { id } });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
        >
            {loading ? "Suppression..." : "Supprimer"}
        </button>
    );
};

export default DeleteCompte;
