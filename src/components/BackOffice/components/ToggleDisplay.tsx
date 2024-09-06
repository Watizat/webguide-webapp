import { Switch } from '@headlessui/react';

interface Props {
  enabled: boolean;
  setEnabled?: (value: boolean) => void;
  title: string;
  disable?: boolean;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SwitchToogle({
  enabled,
  setEnabled = () => {},
  title,
  disable = false,
}: Props) {
  return (
    <Switch.Group as="div" className="flex items-center select-none">
      <Switch
        disabled={disable}
        checked={enabled}
        onChange={setEnabled}
        className={`relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-offset-2 ${
          disable && 'pointer-events-none'
        }`}
      >
        <span className="sr-only">{title}</span>
        <span
          aria-hidden="true"
          className="absolute w-full h-full bg-white rounded-md pointer-events-none"
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'bg-sky-700/80' : 'bg-gray-200',
            'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-700/80">{title}</span>{' '}
      </Switch.Label>
    </Switch.Group>
  );
}
