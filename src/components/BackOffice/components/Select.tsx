interface Props {
  children: React.ReactNode;
  data: {
    label: string;
    defaultValue?: string | number | boolean;
    register: string;
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    validate?: Function;
  };
  formMethods: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    register: Function; // Vous pouvez ajuster le type ici en fonction de vos besoins
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any; // Ajustez le type des erreurs si nécessaire
  };
}

export default function Select({ children, data, formMethods }: Props) {
  const { register } = formMethods;

  return (
    <div>
      <label
        htmlFor={data.register}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {data.label}
      </label>
      <select
        {...register(data.register)}
        defaultValue={data.defaultValue ? data.defaultValue : ''} // Utilisez "as" pour le caster en string si nécessaire
        className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-watizat-600 sm:text-sm sm:leading-6 bg-white"
      >
        {children}
      </select>
    </div>
  );
}
