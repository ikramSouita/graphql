import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_COMPTE = gql`
  mutation AddCompte($compteInput: CompteInput!) {
    saveCompte(compteInput: $compteInput) {
      id
      solde
      dateCreation
      typeCompte
    }
  }
`;

const AddCompte = () => {
    const [solde, setSolde] = useState("");
    const [dateCreation, setDateCreation] = useState("");
    const [typeCompte, setTypeCompte] = useState("COURANT");
    const [popup, setPopup] = useState(false);

    const [saveCompte, { loading, error }] = useMutation(ADD_COMPTE, {
        refetchQueries: ["GetAllComptes"],
        onCompleted: () => setPopup(true),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        saveCompte({
            variables: {
                compteInput: {
                    solde: parseFloat(solde),
                    dateCreation,
                    typeCompte,
                },
            },
        });
        setSolde("");
        setDateCreation("");
        setTypeCompte("COURANT");
    };

    return (
        <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-2xl text-white max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Ajouter un Compte</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Solde :</label>
                    <input
                        type="number"
                        value={solde}
                        onChange={(e) => setSolde(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 rounded-lg shadow-md bg-white text-gray-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date de Création :</label>
                    <input
                        type="date"
                        value={dateCreation}
                        onChange={(e) => setDateCreation(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 rounded-lg shadow-md bg-white text-gray-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Type de Compte :</label>
                    <select
                        value={typeCompte}
                        onChange={(e) => setTypeCompte(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-lg shadow-md bg-white text-gray-800"
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-white text-purple-500 rounded-lg shadow-lg hover:shadow-2xl hover:bg-purple-50 focus:outline-none transition-transform transform hover:scale-105"
                >
                    {loading ? "Ajout en cours..." : "Ajouter"}
                </button>
                {error && <p className="text-red-500 mt-4">Erreur : {error.message}</p>}
            </form>

            {/* Popup Success */}
            {popup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setPopup(false)}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg animate-popup">
                        <h3 className="text-xl font-semibold text-green-600">Compte ajouté avec succès !</h3>
                        <p className="mt-4 text-gray-600">
                            Le compte a été ajouté avec succès dans la base de données.
                        </p>
                        <button
                            onClick={() => setPopup(false)}
                            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-md"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCompte;
