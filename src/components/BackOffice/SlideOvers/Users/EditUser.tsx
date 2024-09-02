import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from '../../../../@types/formInputs';
import { DirectusUser, UserSession } from '../../../../@types/user';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { fetchUsers } from '../../../../store/reducers/admin';
import { editUser } from '../../../../store/reducers/user';
import { axiosInstance } from '../../../../utils/axios';
import { getUserDataFromLocalStorage } from '../../../../utils/user';
import { validateEmail } from '../../../../utils/form/form';
import { UserRole } from '../../../../utils/userRoles';
import Slide from '../components/Slide';
import Header from '../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';

import BtnCloseValid from '../components/BtnCloseValid';
import DeleteConfirmation from '../../../Modals/DeleteConfirmation';

interface Props {
  isOpenSlide: boolean;
  setIsOpenSlide: (open: boolean) => void;
  user: DirectusUser;
}

export default function SlideEditUser({
  isOpenSlide,
  setIsOpenSlide,
  user,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const zones = useAppSelector((state) => state.admin.zones);
  const roles = useAppSelector((state) => state.admin.roles);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const city = useAppSelector((state) => state.user.city);

  const handleCloseSlide = () => {
    setIsOpenSlide(false); // Ferme la slide
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    await dispatch(editUser(formData));
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
      console.error('Error while decoding JWT or dispatching actions:', error);
    }
    setIsOpenSlide(false);
  };

  async function reActiveUser(userId: string) {
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, {
        status: 'active',
      });
      if (response.status === 200) {
        // L'utilisateur a été réactivé avec succès
        handleCloseSlide();
        // Rechargez les données de l'utilisateur réactivé en appelant fetchUsers
        await dispatch(fetchUsers(user.zone.toString()));
      } else {
        // Gérer les erreurs ici
      }
    } catch (error) {
      // Gérer les erreurs ici
    }
  }

  async function archiveUser(userId: string) {
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, {
        status: 'archived',
      });
      if (response.status === 200) {
        // L'utilisateur a été archivé avec succès
        handleCloseSlide();
      } else {
        // Gérer les erreurs ici
      }
    } catch (error) {
      // Gérer les erreurs ici
    }
  }

  return (
    <>
      <DeleteConfirmation
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        handleDeleteConfirm={() => archiveUser(user.id)}
        title="Suppression du compte"
        message={`Êtes-vous sûr de vouloir valider la suppression du compte de ${user.first_name} ${user.last_name}? Cette action est irréversible`}
        deleteBtnText="Confirmer la suppression"
      />
      <Slide isOpenSlide={isOpenSlide} setIsOpenSlide={setIsOpenSlide}>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl select-none"
        >
          <input type="text" hidden value={user.id} {...register('id')} />
          <div className="flex-1 overflow-y-auto">
            <Header
              title="Editer les données du contact"
              setIsOpenSlide={setIsOpenSlide}
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="px-4 pt-6 pb-5 space-y-3 sm:px-6">
                <Input
                  data={{
                    type: 'text',
                    defaultValue: user.first_name,
                    register: 'first_name',
                    required: true,
                    placeholder: 'Prénom',
                  }}
                  formMethods={{ register, errors }}
                />
                <Input
                  data={{
                    type: 'text',
                    defaultValue: user.last_name,
                    register: 'last_name',
                    required: true,
                    placeholder: 'Nom de famille / surnom ou pseudo',
                  }}
                  formMethods={{ register, errors }}
                />
                <Input
                  data={{
                    type: 'email',
                    defaultValue: user.email,
                    register: 'email',
                    required: true,
                    placeholder: 'Adresse email',
                    validate: validateEmail,
                  }}
                  formMethods={{ register, errors }}
                />
                {isAdmin && (
                  <Select
                    data={{
                      label: 'Antenne locale',
                      defaultValue: user.zone,
                      register: 'zone',
                      required: false,
                    }}
                    formMethods={{ register, errors }}
                  >
                    {zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </Select>
                )}
                <Select
                  data={{
                    label: 'Rôle utilisateur·ice',
                    defaultValue: user.role,
                    register: 'role',
                    required: false,
                  }}
                  formMethods={{ register, errors }}
                >
                  {isAdmin &&
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  {!isAdmin &&
                    roles
                      .filter(
                        (filteredRole) =>
                          filteredRole.id !== UserRole.getUUID(UserRole.Admin)
                      )
                      .map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                </Select>
                <div className="flex items-center py-4 mt-5 text-sm text-gray-600 group ">
                  <span>
                    En cas d&apos;oubli de mot de passe, il revient à
                    l&apos;utilisateur·ice, de faire une demande de
                    réinitialisation de mot de passe, via la page de login.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end px-4 py-6 gap-y-5">
            {user.status === 'suspended' && (
              <div className="flex justify-start flex-shrink-0">
                <button
                  type="button"
                  className="px-3 text-sm font-semibold text-green-500"
                  onClick={() => reActiveUser(user.id)}
                >
                  Réactiver le compte utilisateur·ice
                </button>
              </div>
            )}
            <div className="flex justify-start flex-shrink-0">
              <button
                type="button"
                className="px-3 text-sm font-semibold text-red-500"
                onClick={() => setIsOpenModal(true)}
              >
                Supprimer définitivement l&apos;utilisateur·ice
              </button>
            </div>
          </div>
          <BtnCloseValid
            handleCloseSlide={handleCloseSlide}
            handleValidation={handleSubmit(onSubmit)}
          />
        </form>
      </Slide>
    </>
  );
}
