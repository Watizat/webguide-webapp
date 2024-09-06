import VerticalMenu from '../../../../components/VerticalMenu';

interface Props {
  children: React.ReactNode;
  srMessage: string;
  title?: string;
  address?: string;
  headCard?: boolean;
  menuChoices: {
    title: string;
    to?: string;
    onClick?: () => void;
  }[];
}

export default function Card({
  children,
  srMessage,
  title = '',
  address = '',
  headCard = false,
  menuChoices,
}: Props) {
  return (
    <article className="overflow-visible bg-white rounded-lg shadow select-none">
      <h2 className="sr-only" id="profile-overview-title">
        {srMessage}
      </h2>
      <div className="rounded-t-lg">
        <div
          className={`border-b border-gray-200 sm:flex sm:items-baseline sm:justify-between ${
            headCard ? 'px-6 py-5' : 'px-6 py-3'
          }`}
        >
          <div className="sm:w-0 sm:flex-1">
            {headCard ? (
              <>
                <h1
                  id="message-heading"
                  className="text-xl font-medium text-sky-700/60 sm:text-2xl"
                >
                  {title}
                </h1>
                <p className="text-sm font-medium text-slate-600">{address}</p>
              </>
            ) : (
              <h1
                id="message-heading"
                className="font-medium leading-6 text-normal text-sky-800/60"
              >
                {title}
              </h1>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
            <VerticalMenu menuChoices={menuChoices} />
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}

