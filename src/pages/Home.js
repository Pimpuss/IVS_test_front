//IMPORT CSS
import "./style/Home.css";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//IMPORT REACT
import axios from "axios";
import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";

//IMPORT DES CONTEXTS
import { BuildingsContext } from "../context/buildingContext";
import { OrgaContext } from "../context/orgaContext";
import { PiecesContext } from "../context/pieceContext";

function Home({ setDeleteData }) {
  // RECUP DES DATA ET STATES VIA LES CONTEXTS
  const { orga, reloadOrga, setReloadOrga } = useContext(OrgaContext);
  const { buildings, reloadBuilding, setReloadBuilding } =
    useContext(BuildingsContext);
  const { pieces, reloadPiece, setReloadPiece } = useContext(PiecesContext);

  // DECLARATION DES STATES
  const [pageSize1, setPageSize1] = useState(5);
  const [pageSize2, setPageSize2] = useState(5);
  const [pageSize3, setPageSize3] = useState(5);
  const [newOrga, setNewOrga] = useState("");
  const [newInput, setNewInput] = useState({});
  const [newBat, setNewBat] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newOrganisationId, setNewOrganisationId] = useState("");
  const [newPiece, setNewPiece] = useState("");
  const [newPeople, setNewPeoples] = useState("");
  const [newBuildingRattachement, setNewBuildingRattachement] = useState("");

  // DECLARATION DE LOCATION
  let location = useLocation();

  // --------CONCERNANT LES ORGANISATIONS ------------------ //

  // FONCTION CREAN UN NOUVELLE ORGANISATION A L'AIDE DU POST
  const newOrganisation = () => {
    axios
      .post("http://localhost:4242/organisations", {
        ...newOrga,
      })
      .then((response) => console.log("RESPONSE REQUE", response))
      .then(setReloadOrga(!reloadOrga))
      .then(setNewInput({ ...newInput, newOrga: "" }))
      .catch((error) =>
        console.error(
          "---Erreur envoi organisation--- ",
          error.validationErrors
        )
      );
  };
  //----------------------------------------------------//

  // FONCTION METTANT A JOUR LA STATE AVEC LES DATA RECUPERE DANS LES INPUTS ET LE REITIALISANT
  const handleNewOrga = (e) => {
    setNewOrga({ organisation_name: e.target.value });
    setNewInput({
      ...newInput,
      newOrga: e.target.value,
    });
  };
  //----------------------------------------------------------------------------------------------//

  // --------CONCERNANT LES BATIMENTS ------------------ //

  // FONCTION CREAN UN NOUVEAU BATIMENT A L'AIDE DU POST
  const newBatiment = () => {
    axios
      .post("http://localhost:4242/buildings", {
        ...newBat,
        ...newZipCode,
        ...newOrganisationId,
      })
      .then((response) => console.log("RESPONSE REQUE", response))
      .then(setReloadBuilding(!reloadBuilding))
      .then(setReloadOrga(!reloadOrga))
      .then(
        setNewInput({ ...newInput, newBat: "", newZipCode: "", newOrgaId: "" })
      )
      .catch((error) =>
        console.error("---Erreur envoi batiment--- ", error.validationErrors)
      );
  };
  //----------------------------------------------------//

  // FONCTION METTANT A JOUR LA STATE AVEC LES DATA RECUPERE DANS LES INPUTS ET LE REITIALISANT
  const handleNewBat = (e) => {
    setNewBat({ building_name: e.target.value });
    setNewInput({
      ...newInput,
      newBat: e.target.value,
    });
  };
  const handleNewZipCode = (e) => {
    setNewZipCode({ zipcode: e.target.value });
    setNewInput({
      ...newInput,
      newZipCode: e.target.value,
    });
  };
  const handleNewOrganisationId = (e) => {
    setNewOrganisationId({ organisations_id: e.target.value });
    setNewInput({
      ...newInput,
      newOrgaId: e.target.value,
    });
  };
  //----------------------------------------------------------------------------------------------//

  // --------CONCERNANT LES PIECES ------------------ //

  // FONCTION CREAN UN NOUVEAU BATIMENT A L'AIDE DU POST
  const CreatenewPiece = () => {
    axios
      .post("http://localhost:4242/pieces", {
        ...newPiece,
        ...newPeople,
        ...newBuildingRattachement,
      })
      .then((response) => console.log("RESPONSE REQUE", response))
      .then(setReloadPiece(!reloadPiece))
      .then(setReloadBuilding(!reloadBuilding))
      .then(setReloadOrga(!reloadOrga))
      .then(
        setNewInput({ ...newInput, newPiece: "", newPeople: "", newBatId: "" })
      )
      .catch((error) =>
        console.error("---Erreur envoi batiment--- ", error.validationErrors)
      );
  };

  // FONCTION METTANT A JOUR LA STATE AVEC LES DATA RECUPERE DANS LES INPUTS ET LE REITIALISANT
  const handleNewPiece = (e) => {
    setNewPiece({ piece_name: e.target.value });
    setNewInput({
      ...newInput,
      newPiece: e.target.value,
    });
  };
  const handleNewPeople = (e) => {
    setNewPeoples({ peoples: e.target.value });
    setNewInput({
      ...newInput,
      newPeople: e.target.value,
    });
  };
  const handleNewBuilding = (e) => {
    setNewBuildingRattachement({ buildings_id: e.target.value });
    setNewInput({
      ...newInput,
      newBatId: e.target.value,
    });
  };
  //----------------------------------------------------------------------------------------------//

  // RENDU DE LA PAGE HOME
  return (
    <>
      <div className="homeContainer">
        {/* TABLEAU DES ORGANISATIONS */}
        <div className="gridContainer">
          <h2>Les organisations</h2>
          <div className="addOrgaContainer">
            <h3 className="addTitle">Ajouter une organisation</h3>
            <input
              className="addInput"
              type="text"
              name="Nom"
              placeholder="Nom de l'organisation"
              onChange={handleNewOrga}
              value={newInput.newOrga}
            ></input>
            <input
              className="submitButton"
              type="submit"
              name="Ajouter"
              value="Ajouter"
              onClick={newOrganisation}
            ></input>
          </div>
          <DataGrid
            pageSize={pageSize1}
            onPageSizeChange={(newPageSize) => setPageSize1(newPageSize)}
            autoHeight
            columns={[
              {
                field: "id",
                headerName: "ID",
                headerClassName: "headerTableau",
                maxWidth: 200,

                flex: 0.5,
                align: "left",
                headerAlign: "left",
              },
              {
                field: "organisation_name",
                headerName: "Nom de l'organisation",
                headerClassName: "headerTableau",
                maxWidth: 300,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "nb_peoples",
                headerName: "Nombre de personnes totales",
                headerClassName: "headerTableau",
                maxWidth: 500,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },

              {
                field: "action",
                headerName: "Action",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
                renderCell: (field) => (
                  <div className="actionIcon2">
                    <Link
                      to="./editOrga"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        size="1x"
                        color="#ee7b4c"
                        className="editIcon"
                      />
                    </Link>
                    <Link
                      to="./deletOrga"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="#ee7b4c"
                        className="deletIcon"
                      />
                    </Link>
                  </div>
                ),
              },
            ]}
            sx={{
              //REGLAGE GENERAL DU TABLEAU
              fontFamily: "",
              fontSize: "15px",
              color: "#000",
              backgroundColor: "#fff",
              borderColor: "none",
              boxShadow: "5px 5px 5px var(--shadowColor)",
              width: "80%",
              padding: "8px",
              "& .MuiDataGrid-cell:hover": {},
            }}
            onRowClick={(datas) => {
              setDeleteData(datas.row);
            }}
            rows={orga}
            pagination
          />
        </div>
        {/* TABLEAU DES BATIMENTS */}
        <div className="gridContainer">
          <h2>Les batiments</h2>
          <div className="addBatContainer">
            <h3 className="addTitle">Ajouter un batiment</h3>
            <input
              className="addInput"
              type="text"
              name="Nom"
              placeholder="Nom du batiment"
              onChange={handleNewBat}
              value={newInput.newBat}
            ></input>
            <input
              className="addInput"
              type="text"
              name="Code postal"
              placeholder="Code postal"
              onChange={handleNewZipCode}
              value={newInput.newZipCode}
            ></input>
            <input
              className="addInput"
              type="text"
              name="organisation"
              placeholder="Organisation"
              onChange={handleNewOrganisationId}
              value={newInput.newOrgaId}
            ></input>
            <input
              className="submitButton"
              type="submit"
              name="Ajouter"
              value="Ajouter"
              onClick={newBatiment}
            ></input>
          </div>
          <DataGrid
            pageSize={pageSize2}
            onPageSizeChange={(newPageSize) => setPageSize2(newPageSize)}
            autoHeight
            columns={[
              {
                field: "id",
                headerName: "ID",
                headerClassName: "headerTableau",
                maxWidth: 50,

                flex: 0.5,
                align: "left",
                headerAlign: "left",
              },
              {
                field: "building_name",
                headerName: "Nom du batiment",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "zipcode",
                headerName: "Code postal",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "organisation_name",
                headerName: "Nom de l'organisation",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "nb_peoples",
                headerName: "Nombre de personnes totales",
                headerClassName: "headerTableau",
                maxWidth: 400,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "action",
                headerName: "Action",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
                renderCell: (field) => (
                  <div className="actionIcon2">
                    <Link
                      to="./editBat"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        size="1x"
                        color="#ee7b4c"
                        className="editIcon"
                      />
                    </Link>
                    <Link
                      to="./deletBat"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="#ee7b4c"
                        className="deletIcon"
                      />
                    </Link>
                  </div>
                ),
              },
            ]}
            sx={{
              //REGLAGE GENERAL DU TABLEAU
              fontFamily: "",
              fontSize: "15px",
              color: "#000",
              backgroundColor: "#fff",
              borderColor: "none",
              boxShadow: "5px 5px 5px var(--shadowColor)",
              width: "80%",
              padding: "8px",
              "& .MuiDataGrid-cell:hover": {},
            }}
            onRowClick={(datas) => {
              setDeleteData(datas.row);
            }}
            rows={buildings}
            pagination
          />
        </div>
        {/* TABLEAU DES PIECES */}
        <div className="gridContainer">
          <h2>Les pièces</h2>
          <div className="addBatContainer">
            <h3 className="addTitle">Ajouter une pièces</h3>
            <input
              className="addInput"
              type="text"
              name="Nom"
              placeholder="Nom"
              onChange={handleNewPiece}
              value={newInput.newPiece}
            ></input>
            <input
              className="addInput"
              type="text"
              name="peoples"
              placeholder="Nombre de personnes"
              onChange={handleNewPeople}
              value={newInput.newPeople}
            ></input>
            <input
              className="addInput"
              type="text"
              name="batiment"
              placeholder="Batiment de rattachement"
              onChange={handleNewBuilding}
              value={newInput.newBatId}
            ></input>
            <input
              className="submitButton"
              type="submit"
              name="Ajouter"
              value="Ajouter"
              onClick={CreatenewPiece}
            ></input>
          </div>
          <DataGrid
            pageSize={pageSize3}
            onPageSizeChange={(newPageSize) => setPageSize3(newPageSize)}
            autoHeight
            columns={[
              {
                field: "id",
                headerName: "ID",
                headerClassName: "headerTableau",
                maxWidth: 50,

                flex: 0.5,
                align: "left",
                headerAlign: "left",
              },
              {
                field: "piece_name",
                headerName: "Nom de la pièce",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "peoples",
                headerName: "Nombre de personnes",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "building_name",
                headerName: "Batiment de rattachement",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
              },

              {
                field: "action",
                headerName: "Action",
                headerClassName: "headerTableau",
                maxWidth: 800,

                flex: 0.5,
                align: "center",
                headerAlign: "center",
                renderCell: (field) => (
                  <div className="actionIcon2">
                    <Link
                      to="./editPiece"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faPencil}
                        size="1x"
                        color="#ee7b4c"
                        className="editIcon"
                      />
                    </Link>
                    <Link
                      to="./deletPiece"
                      state={{ backgroundLocation: location }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="#ee7b4c"
                        className="deletIcon"
                      />
                    </Link>
                  </div>
                ),
              },
            ]}
            sx={{
              //REGLAGE GENERAL DU TABLEAU
              fontFamily: "",
              fontSize: "15px",
              color: "#000",
              backgroundColor: "#fff",
              borderColor: "none",
              boxShadow: "5px 5px 5px var(--shadowColor)",
              width: "80%",
              padding: "8px",
              "& .MuiDataGrid-cell:hover": {},
            }}
            onRowClick={(datas) => {
              setDeleteData(datas.row);
            }}
            rows={pieces}
            rowsPerPageOptions={[5]}
            pagination
          />
        </div>
      </div>
    </>
  );
}

export default Home;
