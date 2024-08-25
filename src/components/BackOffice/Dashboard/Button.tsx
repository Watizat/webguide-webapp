import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/axios';
import { useAppDispatch } from '../../../hooks/redux';
import { DirectusUser } from '../../../@types/user';
import { UserRole } from '../../../utils/userRoles';

interface Props {
  item: {
    name: string;
    descript: string;
    href: string;
    active: boolean;
    icon: React.ElementType;
    refLocalOnly: boolean;
    devOnly: boolean;
  };
}

export default function Button({ item }: Props) {
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

  /**
   * Test if the button should ba activate or not in function of active param, user role and features permissions.
   * @return {boolean} - True if the button must be activate, else false
   */
  function isActiveItem() {
    return (
      item.active === false || // Si l'item est désactivé
      ((item.refLocalOnly || item.devOnly) && // Ou si l'item est refOnly ou devOnly
        me?.role !== UserRole.getUUID(UserRole.RefLocal) && // et que l'utilisateur n'est pas ref-local
        me?.role !== UserRole.getUUID(UserRole.Admin))
    ); // ni admin
  }

  return (
    <div>
      <Link
        key={item.name}
        to={item.href}
        className={`flex flex-col items-center justify-center m-auto text-center divide-y divide-gray-200 shadow h-52 bg-white/40 rounded-xl aspect-square select-none  ${
          isActiveItem()
            ? 'pointer-events-none'
            : 'hover:shadow-md hover:shadow-watizat-200 group hover:bg-white/60'
        }`}
      >
        <div className="flex flex-col items-center justify-center p-8">
          <div
            className={`flex items-center justify-center w-20 h-auto p-5 overflow-hidden rounded-full aspect-square ${
              isActiveItem()
                ? 'text-gray-300'
                : ' text-indigo-900/70 ring-watizat-200 group-hover:text-watizat-400 '
            }`}
          >
            <item.icon className="flex-shrink-0 mx-auto " />
          </div>
          <h3
            className={`mt-6 text-sm font-semibold  ${
              isActiveItem()
                ? 'text-gray-300'
                : ' text-indigo-900/70 group-hover:text-watizat-400'
            }`}
          >
            {item.name}
          </h3>
          <dl className="flex flex-col justify-between flex-grow mt-1">
            <dt className="sr-only">Description</dt>
            <dd
              className={`text-sm ${
                isActiveItem() ? 'text-gray-300' : ' text-slate-500 '
              }`}
            >
              {item.descript}
            </dd>
          </dl>
        </div>
      </Link>
    </div>
  );
}
