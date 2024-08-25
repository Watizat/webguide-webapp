/** Réprésente un élément de la collection Organisme dans Directus */
export interface Organism {
  id: number;
  name: string;
  address: string | undefined;
  zipcode: string | undefined;
  slug: string;
  contacts: Contact[];
  latitude: number;
  longitude: number;
  city: string;
  comment: string | undefined;
  visible: boolean;
  visible_comment: string | undefined;
  pmr: boolean;
  animals: boolean;
  zone_id: Zone;
  phone: string | undefined;
  mail: string | undefined;
  website: string | undefined;
  translations: OrganismTranslation[];
  schedules: Schedule[];
  services: Service[];
  contacts: Contact[];
  date_created: Date;
  date_updated: Date;
}

/** Réprésente un élément de la collection Contact dans Directus */
export interface Contact {
  id: number;
  name: string;
  comment: string;
  job: string;
  phone: string;
  mail: string;
  visibility: boolean;
  actualisation: boolean;
}

/** Réprésente un élément de la collection Organisme Translations dans Directus */
export interface OrganismTranslation {
  id: number;
  infos_alerte: string | undefined;
  description: string | undefined;
}

/** Réprésente un élément de la collection Schedule dans Directus */
export interface Schedule {
  id: number;
  day: number;
  opentime_am: string | undefined;
  closetime_am: string | undefined;
  opentime_pm: string | undefined;
  closetime_pm: string | undefined;
  closed: boolean;
}

/** Réprésente un élément de la collection Service dans Directus */
export interface Service {
  contacts: Contact[];
  id: number;
  status: string;
  translations: ServiceTranslation[];
  schedules: Schedule[];
  categorie_id: Categorie;
  contacts: Contact[];
}

/** Réprésente un élément de la collection Service Translations dans Directus */
export interface ServiceTranslation {
  id: number;
  name: string;
  infos_alerte: string | undefined;
  slug: string;
  description: string | undefined;
}

/** Réprésente un élément de la collection Categorie dans Directus */
export interface Categorie {
  id: number;
  tag: string;
  translations: CategorieTranslation[];
}

/** Réprésente un élément de la collection Categorie Translation dans Directus */
export interface CategorieTranslation {
  id: number;
  name: string;
  description: string | undefined;
  slug: string;
  langue_id: number;
}

/** Réprésente un élément de la collection User dans Directus (collection système) */
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  last_connected: string;
  role_id: {
    id: number;
    name: string;
  };
  zone: Zone;
}

/** Réprésente un élément de la collection Zone dans Directus */
export interface Zone {
  id: number;
  name: string;
  users: {
    id: number;
  };
}

/** Réprésente un élément de la collection Role dans Directus (collection système) */
export interface Role {
  id: string;
  name: string;
}

/** Réprésente un élément de la collection Day translation dans Directus */
export interface Days {
  numberday: number;
  name: string;
}
