import { categoriesList } from '../../../data/categories';
import './Modal.scss';

interface ModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  categories?: string;
  description?: string;
  infos_alerte?: string;
  schedules?: {
    day?: number;
    opentime_am?: string;
    closetime_am?: string;
    opentime_pm?: string;
    closetime_pm?: string;
  };
}

function ModalService({
  setIsActive,
  name,
  categories,
  description,
  schedules,
  infos_alerte,
}: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-main">
        <h1 className="modal-title">Ajouter un service</h1>
        <form className="modal-list">
          <div className="modal-case">
            <h4 className="modal-case__title">Catégorie</h4>

            <label className="modal-contact__actu">
              Catégorie du service
              <select name="actualisation" defaultValue={categories}>
                {categoriesList.map((i) => (
                  <option key={i.tag} value={i.tag}>
                    {i.tag}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="modal-case">
            <h4 className="modal-case__title">Nom du service</h4>
            <input
              className="modal-case__inputTxt"
              type="text"
              defaultValue={name}
            />
          </div>
          <div className="modal-case">
            <h4 className="modal-case__title">Type de service·s proposé·s</h4>
            <input
              className="modal-case__inputTxt"
              type="text"
              defaultValue={description}
            />
          </div>
          <div className="modal-case">
            <h4 className="modal-case__title">Horaires</h4>
            <table className="modal-data__hours">
              <thead className="modal-data__hoursHead">
                <td>Jours</td>
                <td colSpan={3}>Matin</td>
                <td />
                <td colSpan={3}>Aprés-midi</td>
              </thead>

              {schedules.map((day) => (
                <tr key={day.day} className="modal-data__hoursLine">
                  <td className="modal-data__hoursDay">
                    <span>{day.day}</span>
                  </td>
                  <td className="modal-data__hoursHour">
                    <input
                      defaultValue={day.opentime_am}
                      className="modal-data__hoursInput"
                    />
                  </td>
                  <td className="modal-data__hoursSeparater">-</td>
                  <td className="modal-data__hoursTd">
                    <input
                      defaultValue={day.closetime_am}
                      className="modal-data__hoursInput"
                    />
                  </td>
                  <td className="modal-data__hoursSeparater">/</td>
                  <td className="modal-data__hoursTd">
                    <input
                      defaultValue={day.opentime_pm}
                      className="modal-data__hoursInput"
                    />
                  </td>
                  <td className="modal-data__hoursSeparater">-</td>
                  <td className="modal-data__hoursTd">
                    <input
                      defaultValue={day.closetime_pm}
                      className="modal-data__hoursInput"
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className="modal-case">
            <h4 className="modal-case__title">Info s & alertes</h4>
            <textarea
              className="modal-case__textarea"
              defaultValue={infos_alerte}
            />
          </div>
        </form>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-danger-fill btn-flat modal-actions__close"
          >
            Supprimer
          </button>
          <button
            type="button"
            className="btn btn-info-fill btn-flat modal-actions__close"
            onClick={() => setIsActive(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-sucess-fill btn-flat modal-actions__save"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
ModalService.defaultProps = {
  name: '',
  categories: ',',
  description: '',
  infos_alerte: '',
  schedules: {
    day: 0,
    opentime_am: '     ',
    closetime_am: '     ',
    opentime_pm: '     ',
    closetime_pm: '     ',
  },
};

export default ModalService;