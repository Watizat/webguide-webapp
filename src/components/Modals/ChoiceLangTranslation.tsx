import React from 'react';
import { Dialog } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import ModalBase from './components/ModalBase';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChoiceLangTranslation({
  isOpenModal,
  setIsOpenModal,
  setIsLanguage,
}: Props) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedLanguage = (event.target as HTMLFormElement).location.value;
    setIsLanguage(selectedLanguage);
    setIsOpenModal(false);
  };

  return (
    <ModalBase setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}>
      <div>
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-sky-100">
          <LanguageIcon className="w-6 h-6 text-sky-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Choix d&apos;une langue
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Merci de sélectionner la langue de destination
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-row mt-5 sm:mt-6 gap-x-5">
        <select
          id="location"
          name="location"
          className="block w-full basis-3/6 py-1.5 pl-3 text-gray-900 bg-white border-0 rounded-lg ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6 font-medium"
        >
          <option value="" disabled>
            Choisir une langue...
          </option>
          <option value="Anglais">Anglais</option>
          <option value="Espagnol">Espagnol</option>
          <option value="Italien">Italien</option>
        </select>
        <button
          type="submit"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm basis-3/6 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Valider
        </button>
      </form>
    </ModalBase>
  );
}
