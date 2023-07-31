import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import ModalAddOrganism from '../Modal/ModalAddOrganism';
import ModalUsers from '../Modal/ModalEditUsers';
import './Header.scss';

function Header() {
  const { pathname } = useLocation();
  const [isActiveUsers, setIsActiveUsers] = useState(false);
  const [isActiveOrganism, setIsActiveOrganism] = useState(false);

  return (
    <header id="headerAdmin">
      {isActiveUsers && <ModalUsers setIsActive={setIsActiveUsers} />}
      {isActiveOrganism && (
        <ModalAddOrganism setIsActive={setIsActiveOrganism} />
      )}
      <h2>
        {pathname === '/admin/edition' && 'Edition des données'}
        {pathname === '/admin/users' && 'Gestion des utilisateur·ices'}
      </h2>

      {pathname === '/admin/users' && (
        <button
          type="button"
          className="btn btn-sucess btn-rounded btn-flat"
          onClick={() => setIsActiveUsers(true)}
        >
          Ajouter un·e utilisateur·ice
        </button>
      )}
      {pathname === '/admin/edition' && (
        <button
          type="button"
          className="btn btn-sucess btn-rounded btn-flat"
          onClick={() => setIsActiveOrganism(true)}
        >
          Ajouter un organisme
        </button>
      )}
    </header>
  );
}

export default Header;
