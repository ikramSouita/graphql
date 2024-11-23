import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;

const Comptes = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);
    const [deleteCompte] = useMutation(DELETE_COMPTE, {
        refetchQueries: ['GetAllComptes'],
    });

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
            deleteCompte({ variables: { id } });
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Liste des Comptes</h2>
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Solde</th>
                    <th className="px-4 py-2 text-left">Date de Création</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.allComptes.map((compte) => (
                    <tr key={compte.id} className="hover:bg-gray-100 transition duration-150">
                        <td className="px-4 py-2">{compte.id}</td>
                        <td className="px-4 py-2">{compte.solde}</td>
                        <td className="px-4 py-2">{compte.dateCreation}</td>
                        <td className="px-4 py-2">{compte.typeCompte}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => handleDelete(compte.id)}
                                className="text-red-500 hover:text-red-700 transition duration-150"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Comptes;
