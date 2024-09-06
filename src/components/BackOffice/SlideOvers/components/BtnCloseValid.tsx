interface Props {
  isSaving?: boolean;
  handleCloseSlide: () => void;
  handleValidation: () => void;
}

export default function BtnCloseValid({
  isSaving = false,
  handleCloseSlide,
  handleValidation,
}: Props) {
  return (
    <div className="flex justify-end flex-shrink-0 px-4 py-4">
      <button
        type="button"
        onClick={handleCloseSlide}
        className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Annuler
      </button>
      <button
        type="button"
        onClick={handleValidation}
        className="inline-flex justify-center px-3 py-2 ml-4 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        {isSaving ? 'En cours...' : 'Valider les modifications'}
      </button>
    </div>
  );
}
