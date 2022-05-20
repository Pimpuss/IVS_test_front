import axios from "axios";
import { useEffect, useState, createContext } from "react";

// EXPORT DU CONTEXT POUR L'UTILISER DANS D'AUTRE COMPOSAN
export const PiecesContext = createContext();

const PiecesContextProvier = (props) => {
  //CREATION DE LA STATE QUE SERA MISE A JOUR AVEC LES DATAS RECUPERE DU BACK A L'AIDE DU AXIOS
  const [pieces, setPieces] = useState([]);
  //CREATION DE LA STATE QUI PERMETTERA DE RELOAD LE TABLEAU A CHAQUE MODIFICATION (AJOUT, DELET & EDIT)
  const [reloadPiece, setReloadPiece] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4242/pieces`)
      .then((res) => setPieces(res.data));
  }, [reloadPiece]);
  return (
    // PASSAGE DE PROPS A SAVOIR LES DATA ET LA STATE POUR LES RECUPERER DANS LES DIFFENTS COMPOSANTS
    <PiecesContext.Provider value={{ pieces, reloadPiece, setReloadPiece }}>
      {props.children}
    </PiecesContext.Provider>
  );
};

// EXPORT DU PROVIDER POUR LE DONNER AUX COMPOSANTS ENFANT
export default PiecesContextProvier;
