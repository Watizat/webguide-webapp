import { Inputs } from '../../@types/formInputs';

/** Fonction permettant de mettre en forme les données d'horaires et return un tableau d'objets horaire */
export function scheduleFormat(data: Inputs) {
  const myArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 8; i++) {
    myArray.push({
      day: i,
      id: data[`schedule_id_${i}`] || null,
      opentime_am: data[`schedule_openam_${i}`]
        ? String(data[`schedule_openam_${i}`]).replace('h', ':')
        : null,
      closetime_am: data[`schedule_closeam_${i}`]
        ? String(data[`schedule_closeam_${i}`]).replace('h', ':')
        : null,
      opentime_pm: data[`schedule_openpm_${i}`]
        ? String(data[`schedule_openpm_${i}`]).replace('h', ':')
        : null,
      closetime_pm: data[`schedule_closepm_${i}`]
        ? String(data[`schedule_closepm_${i}`]).replace('h', ':')
        : null,
    });
  }
  return myArray;
}

/** Fonction permettant de vérifier que le format des horaires correspond à ce qui est attendu par le serveur */
export const validateScheduleFormat = (value: string) => {
  // Si la valeur est vide, la validation réussit
  if (!value) {
    return true;
  }
  // Expression régulière pour valider le format d'un horaire
  const schedulePattern =
    /^(?:2[0-3]|[01]?[0-9])(?::[0-5][0-9]|h(?:[0-5][0-9])?)$/;
  return schedulePattern.test(value) || false;
};

/** Fonction permettant de transformer une string en slug en retirant les accents et en remplaçant les espaces par des tirets */
export function createSlug(inputString: string) {
  const slug = inputString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  return slug;
}

/** Fonction de validation d'une adresse email.
 * @return True, si l'email respecte le format d'une addresse email
 */
export const validateEmail = (value: string) => {
  // Si la valeur est vide, la validation réussit
  if (!value) {
    return true;
  }
  // Expression régulière pour valider un email
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(value) || `Cette adresse email n'est pas valide`;
};

/** Fonction de validation pour un numéro de téléphone de 10 chiffres */
export const validatePhoneNumber = (value: string) => {
  // Si la valeur est vide, la validation échoue
  if (!value) {
    return 'Le numéro de téléphone est requis.';
  }

  // Expression régulière pour valider un numéro de téléphone avec exactement 10 chiffres
  const phoneNumberPattern = /^\d{10}$/;

  if (phoneNumberPattern.test(value)) {
    return true;
  }

  return 'Le numéro de téléphone doit comporter exactement 10 chiffres.';
};
