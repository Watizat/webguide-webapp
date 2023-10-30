import classNames from 'classnames';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from '../../../@types/formInputs';
import { Service } from '../../../@types/organism';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setAdminOrganism } from '../../../store/reducers/admin';
import { editService } from '../../../store/reducers/crud';
import { validateScheduleFormat } from '../../../utils/form/form';

import styles from './Modal.module.scss';
import ModalDeleteServiceConfirmation from './ModalDeleteServiceConfirmation';

interface ServiceModalProps {
  service: Service;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditService({ service, setIsActive }: ServiceModalProps) {
  const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);
  const days = useAppSelector((state) => state.organism.days);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector((state) => state.organism.categories);
  const organismId = useAppSelector(
    (state) => state.admin.organism?.id as number
  );
  const isSaving = useAppSelector((state) => state.crud.isSaving);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const serviceId = service.id;
    const serviceTranslationId = service.translations[0].id;
    await dispatch(editService({ formData, serviceId, serviceTranslationId }));

    setIsActive(false);
    await dispatch(setAdminOrganism(organismId));
  };

  if (isActiveConfirmation) {
    return (
      <ModalDeleteServiceConfirmation
        id={service.id}
        setIsActiveConfirmation={setIsActiveConfirmation}
        setIsActive={setIsActive}
      />
    );
  }

  return (
    <div className="absolute top-0 left-0 z-[100] flex items-center content-center justify-center w-screen h-screen bg-gray-950/75">
      <div className="w-4/6 bg-white 2xl:w-2/6 max-h-2/6 rounded-xl">
        <h1 className="pt-8 pb-2 pl-16 text-2xl font-medium text-left text-slate-700">
          Modifier un service
        </h1>
        <form
          className="relative flex flex-col gap-y-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 px-16 pt-4 overflow-y-scroll max-h-50">
            <input
              type="number"
              hidden
              defaultValue={organismId}
              {...register('organisme_id')}
            />
            <div className={`${styles.double} ${styles.start}`}>
              <h4 className={styles.case_title}>Catégorie du service</h4>
              <fieldset className={styles.contact_actu}>
                <select
                  {...register('categorie_id')}
                  defaultValue={service.categorie_id.id}
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
                </select>
                <legend>Catégorie</legend>
              </fieldset>
            </div>
            <div className={styles.case}>
              <h4 className={styles.case_title}>Nom du service</h4>
              <input
                className={styles.case_inputTxt}
                type="text"
                defaultValue={service.translations[0].name}
                {...register('name', { required: 'Ce champs est requis' })}
              />
              {errors.name && (
                <small className="text-red-600">{errors.name.message}</small>
              )}
            </div>
            <div className={styles.case}>
              <h4 className={styles.case_title}>Type de service·s proposé·s</h4>
              <textarea
                className={styles.case_textarea}
                defaultValue={service.translations[0].description}
                {...register('description')}
              />
            </div>
            <div className={styles.case}>
              <h4 className={styles.case_title}>
                Horaires
                <span className={styles.case_legend}>
                  (Formats horaire acceptés: 10h, 10h00, 10:00)
                </span>
              </h4>
              <table className={styles.data_hours}>
                <thead className={styles.data_hoursHead}>
                  <tr>
                    <td>Jours</td>
                    <td colSpan={3}>Matin</td>
                    <td> / </td>
                    <td colSpan={3}>Aprés-midi</td>
                  </tr>
                </thead>
                <tbody>
                  {service.schedules.map((day, index) => (
                    <tr key={day.day} className={styles.data_hoursLine}>
                      <td className={styles.data_hoursDay}>
                        <span>
                          {days.find((d) => d.numberday === day.day)?.name}
                        </span>
                        <input
                          type="hidden"
                          {...register(`schedule_id_${index + 1}`, {
                            value: day.id,
                          })}
                        />
                      </td>
                      <td className={styles.data_hoursHour}>
                        <input
                          defaultValue={day.opentime_am
                            ?.slice(0, -3)
                            .replace(':', 'h')}
                          className={classNames(
                            styles.data_hoursInput,
                            errors[`schedule_openam_${index + 1}`] &&
                              styles.data_hoursInput__error
                          )}
                          {...register(`schedule_openam_${index + 1}`, {
                            validate: (value) =>
                              validateScheduleFormat(value as string),
                          })}
                        />
                      </td>
                      <td className={styles.data_hoursSeparater}>-</td>
                      <td className={styles.data_hoursTd}>
                        <input
                          defaultValue={day.closetime_am
                            ?.slice(0, -3)
                            .replace(':', 'h')}
                          className={classNames(
                            styles.data_hoursInput,
                            errors[`schedule_closeam_${index + 1}`] &&
                              styles.data_hoursInput__error
                          )}
                          {...register(`schedule_closeam_${index + 1}`, {
                            validate: (value) =>
                              validateScheduleFormat(value as string),
                          })}
                        />
                      </td>
                      <td className={styles.data_hoursSeparater}>/</td>
                      <td className={styles.data_hoursTd}>
                        <input
                          defaultValue={day.opentime_pm
                            ?.slice(0, -3)
                            .replace(':', 'h')}
                          className={classNames(
                            styles.data_hoursInput,
                            errors[`schedule_openpm_${index + 1}`] &&
                              styles.data_hoursInput__error
                          )}
                          {...register(`schedule_openpm_${index + 1}`, {
                            validate: (value) =>
                              validateScheduleFormat(value as string),
                          })}
                        />
                      </td>
                      <td className={styles.data_hoursSeparater}>-</td>
                      <td className={styles.data_hoursTd}>
                        <input
                          defaultValue={day.closetime_pm
                            ?.slice(0, -3)
                            .replace(':', 'h')}
                          className={classNames(
                            styles.data_hoursInput,
                            errors[`schedule_closepm_${index + 1}`] &&
                              styles.data_hoursInput__error
                          )}
                          {...register(`schedule_closepm_${index + 1}`, {
                            validate: (value) =>
                              validateScheduleFormat(value as string),
                          })}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.case}>
              <h4 className={styles.case_title}>Infos & alertes</h4>
              <textarea
                className={styles.case_textarea}
                defaultValue={service.translations[0].infos_alerte}
                {...register('infos_alerte')}
              />
            </div>
          </div>
          <div className="flex justify-end gap-12 px-16 py-4 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              className={`${styles.actions_delete} btn btn-danger-fill btn-flat`}
              onClick={() => setIsActiveConfirmation(true)}
            >
              Supprimer
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-white rounded-md shadow-sm text-teal-700/75 ring-1 ring-inset ring-teal-700/50 hover:bg-gray-50"
              onClick={() => setIsActive(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`${styles.actions_save} btn btn-sucess btn-flat`}
            >
              {isSaving && <span>Sauvegarde en cours...</span>}
              {!isSaving && <span>Sauvegarder</span>}{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditService;
