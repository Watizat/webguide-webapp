import { useState, createContext, useContext, useMemo } from 'react';

type ContextType = {
  /** Slide de creation d'organisme dans module Edition */
  isOpenSlideNewOrga: boolean;
  setIsOpenSlideNewOrga: React.Dispatch<React.SetStateAction<boolean>>;
  /** Slide de filtrages des organismes dans module Edition */
  isOpenFiltersOrga: boolean;
  setIsOpenFiltersOrga: React.Dispatch<React.SetStateAction<boolean>>;
  /** Affichage ou masquage des organismes archivés */
  isDisplayArchivedOrga: boolean;
  setIsDisplayArchivedOrga: React.Dispatch<React.SetStateAction<boolean>>;
};

// Créez un contexte
const AppContext = createContext<undefined | ContextType>(undefined);

interface Props {
  children: React.ReactNode;
}
export default function BackOfficeContext({ children }: Props) {
  const [isOpenSlideNewOrga, setIsOpenSlideNewOrga] = useState(false); // Slide de creation d'organisme dans module Edition
  const [isOpenFiltersOrga, setIsOpenFiltersOrga] = useState(false); // Slide de filtrages des organismes dans module Edition
  const [isDisplayArchivedOrga, setIsDisplayArchivedOrga] = useState(false); // Affichage ou masquage des organismes archivés

  // Utilisez useMemo pour s'assurer que l'objet ne change pas à chaque rendu
  const contextValue = useMemo(() => {
    return {
      // Slide de creation d'organisme dans module Edition
      isOpenSlideNewOrga,
      setIsOpenSlideNewOrga,
      // Slide de filtrages des organismes dans module Edition
      isOpenFiltersOrga,
      setIsOpenFiltersOrga,
      // Affichage ou masquage des organismes archivés
      isDisplayArchivedOrga,
      setIsDisplayArchivedOrga,
    };
  }, [
    // Slide de creation d'organisme dans module Edition
    isOpenSlideNewOrga,
    setIsOpenSlideNewOrga,
    // Slide de filtrages des organismes dans module Edition
    isOpenFiltersOrga,
    setIsOpenFiltersOrga,
    // Affichage ou masquage des organismes archivés
    isDisplayArchivedOrga,
    setIsDisplayArchivedOrga,
  ]);

  return (
    // Fournissez les valeurs du contexte aux composants enfants
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Hook pour utiliser le contexte
export const useAppContext = () => {
  return useContext(AppContext);
};
