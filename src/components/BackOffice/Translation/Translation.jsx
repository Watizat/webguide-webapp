import { useState, useRef } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import autosize from 'autosize';
import ChoiceLangTranslation from '../../Modals/ChoiceLangTranslation';

export default function Translation() {
  const [organismsToTranslate, setOrganismsToTranslate] = useState([
    {
      id: '45',
      value: 'Boutique solidarité ARPADE',
      toTranslate: [
        {
          title: 'Description du service',
          value:
            'Accès libre et gratuit pour les majeurs. Horaires variés pour les activités. Appeler ou consulter Facebook pour connaître les lieux et horaires des activités. facebook.com/BoutiqueSolidariteToulouse > Ateliers culturels : lecture et bibliothèque, théâtre, écriture, dessin, pianos, jeux de société > Ateliers sportifs : Foot, boxe et musculation, pétanque > Autres : informatique, jardin…',
        },
        {
          title: "Description d'organisme",
          value:
            "Possibilité de rendez-vous avec un travailleur social en semaine l'après-midi. Permanence sociale du PAIO (par ordre d'arrivée).",
        },
        {
          title: 'Fonction du contact',
          value: "Présidente d'honneur",
        },
      ],
    },
    {
      id: '46',
      value: 'ATELIERS JAMMES - GAF',
      toTranslate: [
        {
          title: 'Nouvelle description du service',
          value:
            'Des activités passionnantes et créatives pour tous les âges. Venez découvrir notre espace convivial et participatif !',
        },
        {
          title: "Nouvelle description d'organisme",
          value:
            "Nous sommes un groupe d'artistes et de passionnés d'art, offrant des ateliers et des événements pour promouvoir la créativité et l'expression artistique.",
        },
        {
          title: 'Nouvelle fonction du contact',
          value: 'Coordinateur des activités artistiques',
        },
      ],
    },
    {
      id: '47',
      value: 'ESPACE SOCIAL DU GRAND-RAMIER',
      toTranslate: [
        {
          title: 'Encore une nouvelle description du service',
          value:
            'Un espace chaleureux dédié à la communauté locale. Découvrez nos initiatives sociales, culturelles et sportives pour tous les résidents.',
        },
        {
          title: "Encore une nouvelle description d'organisme",
          value:
            'Notre équipe dévouée travaille pour créer un environnement inclusif et solidaire. Rejoignez-nous dans nos projets sociaux et culturels !',
        },
        {
          title: 'Encore une nouvelle fonction du contact',
          value: 'Responsable des relations communautaires',
        },
      ],
    },
  ]);

  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isLanguage, setIsLanguage] = useState('');
  const [selectedOrganismId, setSelectedOrganismId] = useState(
    organismsToTranslate[0].id
  );

  const selectRef = useRef(null);

  const handleNextOrganism = () => {
    const currentIndex = organismsToTranslate.findIndex(
      (organism) => organism.id === selectedOrganismId
    );

    if (currentIndex < organismsToTranslate.length - 1) {
      const nextOrganism = organismsToTranslate[currentIndex + 1];

      // Mettez à jour le tableau en retirant l'organisme actuel
      setOrganismsToTranslate((prevOrganisms) =>
        prevOrganisms.filter((organism) => organism.id !== selectedOrganismId)
      );

      setSelectedOrganismId(nextOrganism.id);
    } else if (organismsToTranslate.length === 1) {
      // Si c'est le dernier organisme, réinitialisez les champs
      setSelectedOrganismId('');
      setOrganismsToTranslate([]);
    } else {
      // Ajoutez une condition pour traiter le cas où le tableau est vide
      setSelectedOrganismId('');
      setOrganismsToTranslate([]);
    }
  };

  return (
    <>
      <ChoiceLangTranslation
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setIsLanguage={setIsLanguage}
      />
      {isLanguage && (
        <main className="flex flex-col h-full min-h-full bg-white ">
          <header className="sticky top-0 flex flex-col shadow ">
            <div
              id="actionLign"
              className="flex flex-row items-end justify-between p-4 pt-3 shadow"
            >
              <div className="flex flex-row items-center text-sm font-semibold text-left basis-4/6 text-slate-600 gap-x-4">
                <div className="flex flex-row items-center basis-4/6">
                  <p className="font-semibold text-slate-500">
                    Organisme actuel :{' '}
                  </p>
                  <select
                    ref={selectRef}
                    id="organismsToTranslate"
                    name="organismsToTranslate"
                    className="block py-1.5 pl-3 pr-10 ml-1 font-semibold text-sky-700/60 bg-white border-0 rounded-lg basis-3/5 ring-1 ring-inset ring-gray-100  sm:text-sm sm:leading-6"
                    value={selectedOrganismId}
                    onChange={(e) => setSelectedOrganismId(e.target.value)}
                  >
                    {organismsToTranslate.map((organism) => (
                      <option
                        key={organism.id}
                        value={organism.id}
                        className="font-normal text-slate-600"
                      >
                        {organism.value}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrganismId(organismsToTranslate[0].id);
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                >
                  Réinitialiser les champs
                </button>
              </div>

              <div className="flex flex-row items-center gap-x-10">
                <p className="text-sm font-semibold text-left text-slate-600">
                  Organisme restant:{' '}
                  <span className="font-normal">
                    {organismsToTranslate.length}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={handleNextOrganism}
                  className="flex justify-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Valider et passer au suivant
                </button>
              </div>
            </div>
          </header>
          <div
            id="app"
            className="flex flex-col h-full max-h-full overflow-auto gap-y-2"
          >
            <div
              id="tableHeader"
              className="flex flex-row items-center justify-between w-full grid-cols-2 px-4 py-2 text-sm font-semibold bg-gray-50/80 divide gap-x-8 text-slate-600"
            >
              <p className="text-center basis-1/2 ">
                Langue source : <span className="font-normal"> Français</span>
              </p>
              <p className="text-center basis-2/5">
                Langue de destination :{' '}
                <span className="font-normal"> {isLanguage}</span>
              </p>
            </div>
            <div className="flex flex-col h-full px-5 pb-6 divide-y divide-gray-200 gap-y-3">
              {organismsToTranslate.length > 0 ? (
                // Effectuez le rendu des éléments si le tableau n'est pas vide
                organismsToTranslate
                  .find((organism) => organism.id === selectedOrganismId)
                  .toTranslate.map((translation) => (
                    <div
                      key={translation.title}
                      className="flex flex-col justify-between w-full grid-cols-12 gap-1 px-2 pt-3"
                    >
                      <div className="flex flex-row items-start col-span-2 text-sm">
                        <p className="font-medium text-slate-900">
                          {translation.title}
                        </p>
                      </div>
                      <div className="flex flex-row items-center w-full">
                        <textarea
                          value={translation.value}
                          className="p-2 mr-2 text-sm border border-gray-100 rounded-lg basis-1/2"
                          ref={(textarea) => autosize(textarea)}
                          disabled
                        />
                        <IoArrowForwardCircleOutline className="text-3xl text-slate-500" />
                        <textarea className="p-2 ml-2 text-sm border border-gray-200 rounded-lg basis-1/2" />
                      </div>
                    </div>
                  ))
              ) : (
                // Rendu alternatif si le tableau est vide
                <p>Aucun organisme à afficher.</p>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
