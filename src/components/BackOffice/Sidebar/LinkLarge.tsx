import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/axios';
import { useAppDispatch } from '../../../hooks/redux';
import { DirectusUser } from '../../../@types/user';
import { UserRole } from '../../../utils/userRoles';

interface Props {
  item: {
    name: string;
    href?: string;
    icon: React.ElementType;
    active: boolean;
    onclick: () => void;
    refLocalOnly?: boolean;
    devOnly?: boolean;
  };
}

export default function LinkLarge({ item }: Props) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [me, setMe] = useState<DirectusUser | null>(null);

  useEffect(() => {
    async function getUserInfos() {
      try {
        const { data } = await axiosInstance.get('/users/me');
        setMe(data.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur : ",
          error
        );
        setMe(null);
      }
    }
    getUserInfos();
  }, [dispatch]);

  return (
    <li key={item.name}>
      <Link
        to={item.href || ''}
        onClick={item.onclick}
        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold py-3 ${
          // eslint-disable-next-line no-nested-ternary
          item.active === false || // Si l'item est désactivé
          ((item.refLocalOnly || item.devOnly) && // Ou si l'item est refOnly ou devOnly
            me?.role !== UserRole.getUUID(UserRole.RefLocal) && // et que l'utilisateur n'est pas ref-local
            me?.role !== UserRole.getUUID(UserRole.Admin)) // ou que l'utilisateur n'est pas admin
            ? ' text-watizat-100/40 pointer-events-none'
            : pathname === item.href
            ? ' text-white bg-watizat-400/70'
            : 'text-watizat-100 hover:text-white hover-bg-watizat-600'
        }`}
      >
        <item.icon
          className={`h-6 w-6 shrink-0  ${
            // eslint-disable-next-line no-nested-ternary
            item.active === false || // Si l'item est désactivé
            ((item.refLocalOnly || item.devOnly) && // Ou si l'item est refOnly ou devOnly
              me?.role !== UserRole.getUUID(UserRole.RefLocal) && // et que l'utilisateur n'est pas ref-local
              me?.role !== UserRole.getUUID(UserRole.Admin)) // ou que l'utilisateur n'est pas admin
              ? ' text-watizat-100/40 pointer-events-none'
              : pathname === item.href
              ? ' text-white '
              : 'text-watizat-100 hover:text-white hover-bg-watizat-600'
          } `}
          aria-hidden="true"
        />
        {item.name}
      </Link>
    </li>
  );
}
