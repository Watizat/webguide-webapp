import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchAdminOrganisms } from '../../../store/reducers/admin';
import NewOrganism from '../SlideOvers/Edition/NewOrganism';
import Sidelist from './SideList';
import DataPanel from './DataPanel/DataPanel';
import { useAppContext } from '../../../context/BackOfficeContext';

/** Créer l'ecran d'edition du backoffice.
 *  Il doit lister les organismes de la base de données pour un zone donnée.
 */
export default function Edition() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.user.city as string);

  useEffect(() => {
    dispatch(fetchAdminOrganisms({ city }));
  }, [dispatch, city]);

  // Récupération du contexte
  const appContext = useAppContext();
  if (!appContext) {
    return <div />; // Gérer le cas où le contexte n'est pas défini
  }
  const { isOpenSlideNewOrga, setIsOpenSlideNewOrga } = appContext; // On récupère les valeurs du contexte

  return (
    <main className="flex flex-1 h-full min-w-full min-h-full align-middle bg-slate-50 ">
      <NewOrganism
        isOpenSlide={isOpenSlideNewOrga}
        setIsOpenSlide={setIsOpenSlideNewOrga}
      />
      <Sidelist />
      <DataPanel />
    </main>
  );
}
