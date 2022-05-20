import axios from "axios";
import { useEffect, useState, createContext } from "react";

// EXPORT DU CONTEXT POUR L'UTILISER DANS D'AUTRE COMPOSANT
export const OrgaContext = createContext();

const OrgaContextProvier = (props) => {
  //CREATION DE LA STATE QUE SERA MISE A JOUR AVEC LES DATAS RECUPERE DU BACK A L'AIDE DU AXIOS
  const [orga, setOrga] = useState([]);
  //CREATION DE LA STATE QUI PERMETTERA DE RELOAD LE TABLEAU A CHAQUE MODIFICATION (AJOUT, DELET & EDIT)
  const [reloadOrga, setReloadOrga] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4242/organisations`)
      .then((res) => setOrga(res.data));
  }, [reloadOrga]);
  return (
    // PASSAGE DE PROPS A SAVOIR LES DATA ET LA STATE POUR LES RECUPERER DANS LES DIFFENTS COMPOSANTS
    <OrgaContext.Provider value={{ orga, reloadOrga, setReloadOrga }}>
      {props.children}
    </OrgaContext.Provider>
  );
};

// EXPORT DU PROVIDER POUR LE DONNER AUX COMPOSANTS ENFANT
export default OrgaContextProvier;
