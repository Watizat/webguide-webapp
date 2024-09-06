import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ModalBase from './components/ModalBase';

export default function BetaPhase() {
  const [isOpenModal, setIsOpenModal] = useState(true);

  return (
    <ModalBase setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}>
      <div>
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <ExclamationTriangleIcon
            className="w-6 h-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Site en construction
          </Dialog.Title>
          <div className="px-10 mt-6">
            <div className="text-sm font-semibold text-gray-400">
              Les informations présentes dans ce site le sont uniquement à des
              fins de test
              <br />
              <p className="mt-2 text-watizat-500">
                Ne pas utiliser ce site à des fins d&apos;orientation ou
                d&apos;accompagement social
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-watizat-500 hover:bg-watizat-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setIsOpenModal(false)}
        >
          J&apos;ai compris
        </button>
      </div>
    </ModalBase>
  );
}
