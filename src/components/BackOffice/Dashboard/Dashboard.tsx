import {
  UsersIcon,
  PencilSquareIcon,
  LanguageIcon,
  PrinterIcon,
  ArrowPathIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import Button from './Button';
import BackColor from '../../Container/BackColor';

const navigation = [
  {
    name: 'Edition', // Name displayed on screen
    href: '/admin/edition', // url ref for redirection
    descript: 'Edition des données', // Little description displayed under name
    icon: PencilSquareIcon, // Icon to illustrate main feature
    active: true, // Is the button should be activate. Typically no, if the features is not already implemented
    devOnly: false, // Is the feature is only accessible to developers (aka admin)
    refLocalOnly: false, // Is the feature is only accessible to local referent
  },
  {
    name: 'Traduction',
    href: '/admin/translate',
    descript: 'Espace traduction',
    icon: LanguageIcon,
    active: false,
    devOnly: false,
    refLocalOnly: false,
  },
  {
    name: 'Print',
    href: '/admin/print',
    descript: 'Export pour guides papier',
    icon: PrinterIcon,
    active: false,
    devOnly: false,
    refLocalOnly: false,
  },
  {
    name: 'Actualisation',
    href: '/admin/actualisation',
    descript: "Envoi des mails d'actualisation",
    icon: ArrowPathIcon,
    active: false,
    devOnly: false,
    refLocalOnly: false,
  },
  {
    name: 'Utilisateur·ice·s',
    href: '/admin/users',
    descript: 'Gestion des utilisateur·ice·s',
    icon: UsersIcon,
    active: true,
    devOnly: false,
    refLocalOnly: true,
  },
  {
    name: 'Back-end',
    href: import.meta.env.VITE_BACKEND_URL,
    descript: 'Back-end (Directus)',
    target: '_blank',
    icon: CircleStackIcon,
    active: true,
    devOnly: true,
    refLocalOnly: false,
  },
];

/** 
 * Dashboard is the homepage of the backoffice. It is the first screen shows by the back office.
 * It diplays buttons to navigate to main features of the backoffice.
 */
export default function Dashboard() {
  return (
    <BackColor>
      <main className="flex flex-col items-center justify-center flex-1 w-full h-full gap-y-10">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-center text-slate-700">
          Dashboard
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-10 p-10 md:9/12 xl:w-8/12 2xl:w-1/2">
          {navigation.map((item) => (
            <Button key={item.name} item={item} />
          ))}
        </ul>
      </main>
    </BackColor>
  );
}
