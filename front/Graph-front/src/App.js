import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient"; // Configuration ApolloClient
import AddCompte from "./components/AddCompte";
import ListComptes from "./components/ListComptes";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1 style={{ textAlign: "center", margin: "20px" }}>Gestion des Comptes Bancaires</h1>
                <AddCompte />
                <ListComptes />
            </div>
        </ApolloProvider>
    );
};

export default App;
