import { useAppSelector } from '../../../../hooks/redux';
import Contacts from './Contacts/Contacts';
import Data from './Data/Data';
import Infos from './Infos/Infos';
import styles from './OrgaSheet.module.scss';
import Services from './Services/Services';

function OrgaSheet() {
  const organism = useAppSelector((state) => state.admin.organism);

  if (organism === null) {
    return (
      <div className="orgaSheet-empty">
        Veuillez sélectionner un organisme dans la barre latérale
      </div>
    );
  }

  return (
    <section className={styles.orgaSheet}>
      <Infos />
      <Contacts contacts={organism.contacts} />
      <Data />
      <Services />
    </section>
  );
}

export default OrgaSheet;
