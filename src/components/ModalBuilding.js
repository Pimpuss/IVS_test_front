//IMPORT DU CSS
import "@reach/dialog/styles.css";
import "./styles/Modal.css";

//IMPORT REACT
import axios from "axios";
import { Dialog } from "@reach/dialog";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//IMPORT DES CONTEXTS
import { BuildingsContext } from "../context/buildingContext";
import { OrgaContext } from "../context/orgaContext";

function ModalBat({ deleteData, action }) {
  // DECLARATION DE NAVIGATE AFIN DE POUVOIR S'EN SERVIR POUR UN RETOUR ARRIERE DU MODAL
  let navigate = useNavigate();

  // RECUP DES LA STATE DE RELOAD VIA LE CONTEXT
  const { reloadBuilding, setReloadBuilding } = useContext(BuildingsContext);
  const { reloadOrga, setReloadOrga } = useContext(OrgaContext);

  // DECLARATION DES STATE PERMETANT DE STOCKER ET MODIFIER LES DATA RECUPERER DES INPUT
  const [newName, setNewName] = useState(deleteData.building_name);
  const [newZipCode, setNewZipCode] = useState(deleteData.zipcode);
  const [newOrgaId, setNewOrgaId] = useState(deleteData.organisations_id);

  //-------FONCTION DELET----------
  const handleDeletData = () => {
    axios
      .delete(`http://localhost:4242/buildings/${deleteData.id}`)
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadBuilding(!reloadBuilding))
      .then(setReloadOrga(!reloadOrga));
    navigate(-1);
  };
  //--------------------------------

  //-------FONCTION EDIT----------
  const handleEdit = () => {
    axios
      .put(`http://localhost:4242/buildings/${deleteData.id}`, {
        building_name: newName,
        zipcode: newZipCode,
        organisations_id: newOrgaId,
      })
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadBuilding(!reloadBuilding));
    navigate(-1);
  };
  //--------------------------------

  // RENDU DU MODAL
  return (
    //COMPOSANT DIALOG PERMETTANT DE CREE FACILEMENT DES MODAL
    <Dialog role="alertdialog" id="modalBat" aria-label="Aria Name">
      <div className="fragmentContainer">
        <div className="backContainer" onClick={() => navigate(-1)}></div>
        <div className="popUpModalDelet">
          <div className="modalContainer">
            <h2>
              Êtes-vous sûr de vouloir{" "}
              {action === "supprimer" ? "supprimer" : "éditer"}{" "}
              {deleteData.building_name}
            </h2>
            <div className="buttonModalDelet">
              {action === "supprimer" && (
                <div className="deletContainer">
                  <button
                    className="BackButton modalButton"
                    onClick={() => navigate(-1)}
                  >
                    Retour
                  </button>
                  <button
                    className="ValideButton modalButton"
                    onClick={() => handleDeletData()}
                  >
                    Supprimer
                  </button>
                </div>
              )}
              {action === "editer" && (
                <div className="editContainer">
                  <div className="editInput">
                    <input
                      className="inputEdit"
                      type="text"
                      name="Nom"
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={deleteData.building_name}
                    />
                    <input
                      className="inputEdit"
                      type="text"
                      name="zipecode"
                      onChange={(e) => setNewZipCode(e.target.value)}
                      placeholder={deleteData.zipcode}
                    />
                    <input
                      className="inputEdit"
                      type="text"
                      name="orgaId"
                      onChange={(e) => setNewOrgaId(e.target.value)}
                      placeholder={deleteData.organisations_id}
                    />
                  </div>
                  <div className="editBtn">
                    <button
                      className="BackButton modalButton"
                      onClick={() => navigate(-1)}
                    >
                      Retour
                    </button>
                    <button
                      className="ValideButton modalButton"
                      onClick={() => handleEdit()}
                    >
                      Valider
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalBat;
