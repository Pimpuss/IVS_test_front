//IMPORT DU CSS
import "./App.css";

//IMPORT REACT
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

//IMPORT DES CONTEXTS
import BuildingsContextProvier from "./context/buildingContext";
import OrgaContextProvier from "./context/orgaContext";
import PiecesContextProvier from "./context/pieceContext";

//IMPORT DES COMPOSANTS
import Header from "./components/Header";
import Home from "./pages/Home";
import ModalBuildings from "./components/ModalBuilding";
import ModalOrga from "./components/ModalOrga";
import ModalPiece from "./components/ModalPiece";

function App() {
  let location = useLocation();
  let backgroundLocation = location.state && location.state.backgroundLocation;
  const [deleteData, setDeleteData] = useState("");
  return (
    <div className="App">
      {/* IMPORT DES PROVIDER DES CONTEXT PASSANT LES DATA A TOUT LES COMPOSANTS ENCAPSULER */}
      <OrgaContextProvier>
        <BuildingsContextProvier>
          <PiecesContextProvier>
            <Header />
            {/* DECLARATION DES ROUTES ET LOCATION AFIN DE DIRE OU L'ON SE SITUE DANS LE SITE LORS DE L'UTILISATION */}
            <Routes location={backgroundLocation || location}>
              <Route
                path="/"
                element={<Home setDeleteData={setDeleteData} />}
              />
            </Routes>
            {/* DECLARATION DES ROUTES POUR LES MODAL ET UTILISANT BACKGROUND LOCATION POUR QUE LE RESTE DU SITE RESTE VISIBLE*/}
            {backgroundLocation && (
              <Routes>
                <Route
                  path="/deletOrga"
                  element={
                    <ModalOrga deleteData={deleteData} action={"supprimer"} />
                  }
                />
                <Route
                  path="/editOrga"
                  element={
                    <ModalOrga deleteData={deleteData} action={"editer"} />
                  }
                />
                <Route
                  path="/deletBat"
                  element={
                    <ModalBuildings
                      deleteData={deleteData}
                      action={"supprimer"}
                    />
                  }
                />
                <Route
                  path="/editBat"
                  element={
                    <ModalBuildings deleteData={deleteData} action={"editer"} />
                  }
                />
                <Route
                  path="/deletPiece"
                  element={
                    <ModalPiece deleteData={deleteData} action={"supprimer"} />
                  }
                />
                <Route
                  path="/editPiece"
                  element={
                    <ModalPiece deleteData={deleteData} action={"editer"} />
                  }
                />
              </Routes>
            )}
          </PiecesContextProvier>
        </BuildingsContextProvier>
      </OrgaContextProvier>
    </div>
  );
}

export default App;
