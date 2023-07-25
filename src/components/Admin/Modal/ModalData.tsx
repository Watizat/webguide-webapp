import './Modal.scss';

interface ModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  pmr?: boolean;
  animals?: boolean;
  description?: string;
  infos_alertes?: string;
  schedules?: {
    day?: number;
    opentime_am?: string;
    closetime_am?: string;
    opentime_pm?: string;
    closetime_pm?: string;
  };
}

function ModalData({
  setIsActive,
  pmr,
  animals,
  description,
  schedules,
  infos_alertes,
}: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-main">
        <h1 className="modal-title">Informations génerales</h1>
        <form className="modal-list">
          <div className="modal-case">
            <h4 className="modal-case__title">Accés</h4>
            <div className="modal-data__accessDetails">
              <label className="modal-data__pmr">
                {pmr ? (
                  <input type="checkbox" defaultChecked />
                ) : (
                  <input type="checkbox" />
                )}
                Accessible PSH /PMR
              </label>
              <label className="modal-data__pmr">
                {animals ? (
                  <input type="checkbox" defaultChecked />
                ) : (
                  <input type="checkbox" />
                )}
                Animaux admis
              </label>
            </div>
          </div>
          <div className="modal-case">
            <h4 className="modal-case__title">Description</h4>
            <textarea
              className="modal-case__textarea"
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
            <h4 className="modal-case__title">Infos, alerte</h4>
            <textarea
              className="modal-case__textarea"
              defaultValue={infos_alertes}
            />
          </div>
        </form>
        <div className="modal-actions">
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
ModalData.defaultProps = {
  pmr: false,
  animals: false,
  description: '',
  infos_alertes: '',
  schedules: {
    day: 0,
    opentime_am: '',
    closetime_am: '',
    opentime_pm: '',
    closetime_pm: '',
  },
};

export default ModalData;