//IMPORT DU CSS
import "@reach/dialog/styles.css";
import "./styles/Modal.css";

//IMPORT REACT
import axios from "axios";
import { Dialog } from "@reach/dialog";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//IMPORT CONTEXT
import { OrgaContext } from "../context/orgaContext";

function ModalOrga({ deleteData, action }) {
  // DECLARATION DE NAVIGATE AFIN DE POUVOIR S'EN SERVIR POUR UN RETOUR ARRIERE DU MODAL
  let navigate = useNavigate();

  // RECUP DES LA STATE DE RELOAD VIA LE CONTEXT
  const { reloadOrga, setReloadOrga } = useContext(OrgaContext);

  // DECLARATION DES STATE PERMETANT DE STOCKER ET MODIFIER LES DATA RECUPERER DES INPUT
  const [newName, setNewName] = useState(deleteData.organisation_name);

  //-------FONCTION DELET----------
  const handleDeletData = () => {
    axios
      .delete(`http://localhost:4242/organisations/${deleteData.id}`)
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadOrga(!reloadOrga));
    navigate(-1);
  };
  //--------------------------------

  //-------FONCTION EDIT----------
  const handleEdit = () => {
    axios
      .put(`http://localhost:4242/organisations/${deleteData.id}`, {
        organisation_name: newName,
      })
      .then((response) => console.log("RESPONSE REQUETE", response))
      .then(setReloadOrga(!reloadOrga));
    navigate(-1);
  };
  //--------------------------------

  // RENDU DU MODAL
  return (
    //COMPOSANT DIALOG PERMETTANT DE CREE FACILEMENT DES MODAL
    <Dialog role="alertdialog" id="modalOrga" aria-label="Aria Name">
      <div className="fragmentContainer">
        <div className="backContainer" onClick={() => navigate(-1)}></div>
        <div className="popUpModalDelet">
          <div className="modalContainer">
            <h2>
              Êtes-vous sûr de vouloir{" "}
              {action === "supprimer" ? "supprimer" : "éditer"}{" "}
              {deleteData.organisation_name}
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
                      className="inputName"
                      type="text"
                      name="Nom"
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={deleteData.organisation_name}
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

export default ModalOrga;
