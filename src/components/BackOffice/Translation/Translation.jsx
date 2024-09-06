import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export default function Translation() {

  return (
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
                id="location"
                name="location"
                className="block py-1.5 pl-3 pr-10 ml-1 font-semibold text-sky-700/60 bg-white border-0 rounded-lg basis-3/5 ring-1 ring-inset ring-gray-100  sm:text-sm sm:leading-6"
                defaultValue="Anglais"
              >
                <option value="465465" className="font-medium text-gray-600">
                  Boutique solidarité ARPADE
                </option>
                <option value="8756" className="font-medium text-gray-600">
                  ATELIERS JAMMES - GAF
                </option>
                <option
                  value="4654187965"
                  className="font-medium text-gray-600"
                >
                  ESPACE SOCIAL DU GRAND-RAMIER
                </option>
              </select>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
            >
              Réinitialiser les champs
            </button>
          </div>

          <div className="flex flex-row items-center gap-x-10">
            <p className="text-sm font-semibold text-left text-slate-600">
              Organisme restant: <span className="font-normal">12</span>
            </p>
            <button
              type="button"
              className="flex justify-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Valider et passer au suivant
            </button>
          </div>
        </div>
      </header>
      <div
        id="app"
        className="flex flex-col h-full max-h-full overflow-auto gap-y-6"
      >
        {' '}
        <div
          id="tableHeader"
          className="flex flex-row items-center justify-between w-full grid-cols-2 px-4 py-2 text-sm font-semibold bg-gray-50/80 divide gap-x-8 text-slate-600"
        >
          <p className="text-center basis-1/2 ">
            Langue source : <span className="font-normal"> Français</span>
          </p>
          <div className="flex flex-row items-center justify-center px-20 basis-1/2">
            <p className="text-center basis-2/5">Langue de destination : </p>

            <select
              id="location"
              name="location"
              className="block w-full py-1.5 pl-3 pr-10 text-gray-900 bg-white border-0 rounded-lg basis-2/5 ring-1 ring-inset ring-gray-200  sm:text-sm sm:leading-6 font-medium"
              defaultValue="Anglais"
            >
              <option value="Anglais">Anglais</option>
              <option value="Espagnol">Espagnol</option>
              <option value="Italien">Italien</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col h-full px-5 gap-y-2">
          <div className="flex flex-col pb-6 divide-y divide-gray-200 gap-y-3">
            {Array.from({ length: 15 }, (index) => (
              <div
                key={index}
                className="flex flex-col justify-between w-full grid-cols-12 gap-1 px-2 pt-3"
              >
                <div className="flex flex-row items-start col-span-2 text-sm">
                  <p className="font-medium text-slate-900">
                    Description de service
                  </p>
                </div>
                <div className="flex flex-row items-center w-full">
                  <textarea
                    className="p-2 mr-2 text-sm border border-gray-100 rounded-lg basis-1/2"
                    disabled
                  />
                  <IoArrowForwardCircleOutline className="text-3xl text-slate-500" />
                  <textarea className="p-2 ml-2 text-sm border border-gray-200 rounded-lg basis-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
