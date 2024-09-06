import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ModalBase from './components/ModalBase';

interface Props {
  setIsOpenModal: (open: boolean) => void;
  isOpenModal: boolean;
  handleDeleteConfirm: () => void;
  title: string;
  message: string;
  deleteBtnText: string;
}

export default function DeleteConfirmation({
  setIsOpenModal,
  isOpenModal,
  handleDeleteConfirm,
  title,
  message,
  deleteBtnText,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <ModalBase setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}>
      <div className="sm:flex sm:items-start">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="w-6 h-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setIsOpenModal(false)}
          ref={cancelButtonRef}
        >
          Annuler
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={handleDeleteConfirm}
        >
          {deleteBtnText}
        </button>
      </div>
    </ModalBase>
  );
}
