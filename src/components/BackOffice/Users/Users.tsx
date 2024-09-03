import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import UserLine from './UserLine';
import { UserSession } from '../../../@types/user';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUsers } from '../../../store/reducers/admin';
import { axiosInstance } from '../../../utils/axios';
import { getUserDataFromLocalStorage } from '../../../utils/user';
import { changeAdmin } from '../../../store/reducers/user';
import { UserRole } from '../../../utils/userRoles';

export default function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.admin.users);
  const zones = useAppSelector((state) => state.admin.zones);
  const city = useAppSelector((state) => state.user.city);

  useEffect(() => {
    const fetchData = async () => {
      const cityLocal = localStorage.getItem('city');

      const cityId = cityLocal
        ? zones.find((zone) => zone.name === cityLocal)
        : zones.find((zone) => zone.name === city);
      const localUser = getUserDataFromLocalStorage();
      const { data } = await axiosInstance.get('/users/me');
      const { zone } = data.data;

      if (!localUser?.token) {
        return;
      }
      try {
        const decodedUser = jwtDecode(
          localUser.token.access_token
        ) as UserSession;
        if (decodedUser.role === UserRole.getUUID(UserRole.Admin)) {
          dispatch(changeAdmin(true));
          if (cityId !== undefined) {
            await dispatch(fetchUsers(cityId.id.toString()));
          } else {
            await dispatch(fetchUsers(null));
          }
        } else {
          await dispatch(fetchUsers(zone.toString()));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'Error while decoding JWT or dispatching actions:',
          error
        );
      }
    };

    fetchData();
  }, [dispatch, zones, city]);

  return (
    <main className="flex flex-col flex-1 min-w-full align-middle bg-white h-max min-h-max sm:px-6 lg:px-8 grow">
      <table className="min-w-full select-none">
        <thead className="sticky z-10 w-full bg-white top-16">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 "
            >
              Utilisateur·ice
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Rôle
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
            >
              Antenne locale
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
            >
              Dernière connexion
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-right text-sm font-semibold text-white"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users
            .filter((user) => user.status !== 'archived') // Filtrez les utilisateurs par statut "actif"
            .sort((a, b) => a.first_name.localeCompare(b.first_name)) // Triez le tableau par le prénom
            .map((user) => (
              <UserLine key={user.email} user={user} />
            ))}
        </tbody>
      </table>
    </main>
  );
}
