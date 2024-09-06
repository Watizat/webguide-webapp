import React from 'react';

export default function Translation() {
  return (
    <main className="flex flex-col h-full min-h-full bg-white gap-y-2">
      <header className="sticky top-0 flex flex-col shadow ">
        <div className="flex flex-row items-end justify-between p-4 pt-3 shadow gap-x-10 ">
          <div className="flex flex-row justify-between basis-8/12">
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sélectionner une langue à traduire
              </label>
              <select
                id="location"
                name="location"
                className="block w-full py-2 pl-3 pr-10 text-gray-900 bg-white border-0 rounded-lg ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Canada"
              >
                <option>Anglais</option>
                <option>Espagnol</option>
                <option>Italien</option>
              </select>
            </div>
            <form className="w-8/12">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="items-center justify-between w-full overflow-hidden bg-white border rounded-lg sm:flex">
                <input
                  className="flex-grow px-2 text-sm text-gray-400 outline-none"
                  type="text"
                  placeholder="Recherche par organisme"
                />
                <div className="items-center mx-auto space-x-4 rounded-lg ms:flex ">
                  <button
                    type="button"
                    className="px-4 py-1.5 text-sm font-thin text-white rounded-lg bg-sky-600 hover:bg-sky-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-row gap-x-5">
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
            >
              Réinitialiser les champs
            </button>
            <button
              type="button"
              className="flex justify-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Valider et passer au suivant
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full grid-cols-2 px-4 py-3 text-sm font-semibold divide gap-x-8 bg-gray-50">
          <p className="basis-2/12">Type de texte</p>
          <p className="text-center basis-5/12 ">
            Français <span className="font-normal"> (langue source)</span>
          </p>
          <p className="text-center basis-5/12 ">
            Anglais
            <span className="font-normal"> (langue de destination)</span>
          </p>
        </div>
      </header>
      <div
        id="app"
        className="flex flex-col h-full max-h-full overflow-auto gap-y-6"
      >
        <div className="flex flex-col h-full px-5 gap-y-2">
          <div className="flex flex-col divide-y divide-gray-100 gap-y-3">
            {Array.from({ length: 15 }, (index) => (
              <div
                key={index}
                className="grid justify-between w-full grid-cols-12 pt-3 divide gap-x-8"
              >
                <div className="flex flex-row items-start col-span-2 text-sm">
                  <p>Description de service</p>
                </div>
                <textarea
                  className="col-span-5 p-2 text-sm border border-gray-100 rounded-lg"
                  disabled
                />
                <textarea className="col-span-5 p-2 text-sm border border-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
