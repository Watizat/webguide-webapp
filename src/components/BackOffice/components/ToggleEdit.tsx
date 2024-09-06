interface Props {
  data: {
    label: string;
    description: string;
    defaultValue?: boolean;
    register: string;
  };
  formMethods: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    register: Function; // Vous pouvez ajuster le type ici en fonction de vos besoins
  };
}

export default function Checkbox({ data, formMethods }: Props) {
  const { register } = formMethods;

  return (
    <div className="flex flex-col ">
      <div className="block text-sm font-medium leading-6 text-gray-900">
        {data.label}
      </div>
      <label className="relative inline-flex items-center mt-3 cursor-pointer">
        <input
          type="checkbox"
          id={data.register}
          name={data.register}
          defaultChecked={data.defaultValue}
          {...register(data.register)}
          aria-describedby="candidates-description"
          className="sr-only peer"
        />
        <div className="w-10 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full   after:content-[''] after:absolute after:-top-[2px] after:-start-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-sky-700 after:drop-shadow-xl peer-checked:shadow-xl peer-checked:after:border-gray-200 peer-checked:after:ring-0 " />
        <span className="ml-5 text-sm font-medium text-gray-500 after:duration-700 after:ease-in-out after:transition-transform">
          {data.description}
        </span>
      </label>
    </div>
  );
}
