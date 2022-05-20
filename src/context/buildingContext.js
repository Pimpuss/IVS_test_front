import axios from "axios";
import { useEffect, useState, createContext } from "react";

// EXPORT DU CONTEXT POUR L'UTILISER DANS D'AUTRE COMPOSANT
export const BuildingsContext = createContext();

const BuildingsContextProvier = (props) => {
  //CREATION DE LA STATE QUE SERA MISE A JOUR AVEC LES DATAS RECUPERE DU BACK A L'AIDE DU AXIOS
  const [buildings, setBuildings] = useState([]);
  //CREATION DE LA STATE QUI PERMETTERA DE RELOAD LE TABLEAU A CHAQUE MODIFICATION (AJOUT, DELET & EDIT)
  const [reloadBuilding, setReloadBuilding] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4242/buildings`)
      .then((res) => setBuildings(res.data));
  }, [reloadBuilding]);
  return (
    // PASSAGE DE PROPS A SAVOIR LES DATA ET LA STATE POUR LES RECUPERER DANS LES DIFFENTS COMPOSANTS
    <BuildingsContext.Provider
      value={{ buildings, reloadBuilding, setReloadBuilding }}
    >
      {props.children}
    </BuildingsContext.Provider>
  );
};

// EXPORT DU PROVIDER POUR LE DONNER AUX COMPOSANTS ENFANTS
export default BuildingsContextProvier;
