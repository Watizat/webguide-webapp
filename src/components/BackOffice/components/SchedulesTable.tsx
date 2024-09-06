import { Schedule, Days } from '../../../@types/organism';
import { validateScheduleFormat } from '../../../utils/form/form';

interface Props {
  data: {
    schedules?: Schedule[];
    days: Days[];
    register: string;
  };
  formMethods: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    register: Function; // Vous pouvez ajuster le type ici en fonction de vos besoins
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any; // Ajustez le type des erreurs si nécessaire
  };
}

export default function SchedulesTable({ data, formMethods }: Props) {
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const { register, errors } = formMethods;

  // Créer une copie du tableau avant de trier
  const orderedSchedules = data.schedules?.map((objet) => ({ ...objet }));
  // Trier les objets par le jour (day) en ordre croissant
  orderedSchedules?.sort((a, b) => a.day - b.day);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="block text-sm leading-6 text-gray-900 text-centerfont-medium">
        Horaires
      </div>
      <table className="flex flex-col divide-y divide-gray-300 rounded-md ring-1 ring-gray-200">
        <thead className="">
          <tr className="w-full text-sm grow">
            <th className="w-16 py-2 font-medium text-left text-black pl-1.5">
              Jours
            </th>
            <th
              className="py-2 font-medium text-center text-black w-44"
              colSpan={3}
            >
              Matin
            </th>
            <th
              className="w-40 py-2 font-medium text-center text-black"
              colSpan={3}
            >
              Après-midi
            </th>
          </tr>
        </thead>
        {orderedSchedules ? (
          // Si le tableau se génère avec des données à afficher
          <tbody className="gap-2 divide-y divide-gray-100">
            {orderedSchedules.map((day) => (
              <tr key={day.day} className=" hover:bg-gray-50/80">
                <td className="py-2 pl-1.5">
                  <span className="text-sm text-center">
                    {data.days.find((d) => d.numberday === day.day)?.name}
                  </span>
                  <input
                    type="hidden"
                    {...register(`schedule_id_${day.day}`, {
                      value: day.id,
                    })}
                  />
                </td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_openam_${day.day}`, {
                      value: day.opentime_am
                        ?.slice(0, -3)
                        .replace(':', 'h') as string,
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>-</td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_closeam_${day.day}`, {
                      value: day.closetime_am
                        ?.slice(0, -3)
                        .replace(':', 'h') as string,
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>/</td>
                <td className="w-20 py-2">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_openpm_${day.day}`, {
                      value: day.opentime_pm
                        ?.slice(0, -3)
                        .replace(':', 'h') as string,
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>-</td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_closepm_${day.day}`, {
                      value: day.closetime_pm
                        ?.slice(0, -3)
                        .replace(':', 'h') as string,
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          // En cas de création d'un organisme = pas d'horaires à afficher
          <tbody className="gap-2 divide-y divide-gray-100">
            {data.days.map((i, index) => (
              <tr key={i.name} className=" hover:bg-gray-50/80">
                <td className="py-2">
                  <span className="pl-1.5 text-sm text-center">{i.name}</span>
                  <input
                    type="hidden"
                    {...register(`schedule_id_${index + 1}`)}
                  />
                </td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_openam_${index + 1}`, {
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>-</td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_closeam_${index + 1}`, {
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>/</td>
                <td className="w-20 py-2">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_openpm_${index + 1}`, {
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
                <td>-</td>
                <td className="w-20 py-2 ">
                  <input
                    className="w-full text-sm text-center rounded-md"
                    {...register(`schedule_closepm_${index + 1}`, {
                      validate: (value: string) =>
                        validateScheduleFormat(value as string),
                    })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <p className="text-sm text-gray-400">
        Notice : Format horaire accepté : 10h, 10h00, 10:00
      </p>
    </div>
  );
}
