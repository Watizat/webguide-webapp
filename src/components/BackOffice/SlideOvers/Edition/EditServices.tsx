import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Service } from '../../../../@types/organism';
import { Inputs } from '../../../../@types/formInputs';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setAdminOrganism } from '../../../../store/reducers/admin';
import { editService } from '../../../../store/reducers/crud';
import Slide from '../components/Slide';
import Header from '../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import SchedulesTable from '../../components/SchedulesTable';
import BtnCloseValid from '../components/BtnCloseValid';

interface Props {
  isOpenSlide: boolean;
  setIsOpenSlide: React.Dispatch<React.SetStateAction<boolean>>;
  service: Service;
}

export default function EditOrgaServices({
  isOpenSlide,
  setIsOpenSlide,
  service,
}: Props) {
  const dispatch = useAppDispatch();
  const days = useAppSelector((state) => state.organism.days);

  const {
    register, // Récupère les fonctions register
    handleSubmit, // Récupère la fonction handleSubmit
    formState: { errors }, // Récupère les erreurs
    reset, // Ajoutez la fonction reset pour réinitialiser le formulaire
  } = useForm<Inputs>();

  // Réinitialiser le formulaire à l'ouverture de la slide
  useEffect(() => {
    if (isOpenSlide) {
      reset();
    }
  }, [isOpenSlide, reset]);

  const categoriesList = useAppSelector((state) => state.organism.categories);
  const organismId = useAppSelector(
    (state) => state.admin.organism?.id as number
  );
  const isSaving = useAppSelector((state) => state.crud.isSaving);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const serviceId = service.id;
    const serviceTranslationId = service.translations[0].id;
    await dispatch(editService({ formData, serviceId, serviceTranslationId }));

    setIsOpenSlide(false);
    await dispatch(setAdminOrganism(organismId));
  };

  const handleCloseSlide = () => {
    // reset(); // Réinitialise le formulaire à la fermeture de la slide
    setIsOpenSlide(false); // Ferme la slide
  };

  return (
    <Slide isOpenSlide={isOpenSlide} setIsOpenSlide={setIsOpenSlide}>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl select-none"
      >
        <input type="text" hidden value={service.id} {...register('id')} />
        <div className="flex-1 overflow-y-auto">
          <Header
            title="Editer les informations du service"
            setIsOpenSlide={setIsOpenSlide}
          />
          <div className="flex flex-col justify-between flex-1 px-4 pt-6 pb-5 space-y-3 sm text-center:px-6 ">
            <Select
              data={{
                label: 'Catégorie du service',
                defaultValue: service.categorie_id.id,
                register: 'categorie_id',
                required: true,
              }}
              formMethods={{ register, errors }}
            >
              <option disabled>Selectionnez une catégorie</option>
              {categoriesList.map((category) => (
                <option
                  key={category.translations[0].name}
                  value={`${category.id}`}
                >
                  {category.translations[0].name}
                </option>
              ))}
            </Select>
            <Input
              data={{
                type: 'string',
                label: 'Nom du service',
                defaultValue: service.translations[0].name,
                register: 'name',
                required: true,
                placeholder: 'Nom du service proposé',
              }}
              formMethods={{ register, errors }}
            />
            <Textarea
              data={{
                type: 'string',
                label: 'Description',
                defaultValue: service.translations[0].description,
                register: 'description',
                required: false,
                placeholder: 'Décrire ici les missions du service',
              }}
              formMethods={{ register, errors }}
            />
            <Textarea
              data={{
                type: 'string',
                label: 'Infos & alertes',
                defaultValue: service.translations[0].infos_alerte,
                register: 'infos_alerte',
                required: false,
                placeholder: 'ex : Service fermé durant les vacances de Noël',
              }}
              formMethods={{ register, errors }}
            />
            <SchedulesTable
              data={{
                schedules: service.schedules,
                days,
                register: 'schedules',
              }}
              formMethods={{ register, errors }}
            />
          </div>
        </div>
        <BtnCloseValid
          isSaving={isSaving}
          handleCloseSlide={handleCloseSlide}
          handleValidation={handleSubmit(onSubmit)}
        />
      </form>
    </Slide>
  );
}
