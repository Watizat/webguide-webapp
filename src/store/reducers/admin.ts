import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { Organism, Role, Zone } from '../../@types/organism';
import { DirectusUser } from '../../@types/user';
import { axiosInstance } from '../../utils/axios';

/** Définition de la structure de l'état AdminState.  */
interface AdminState {
  organisms: Organism[]; // Tableau d'objets Organism
  organism: Organism | null; // Organisme sélectionné actuel ou null
  isLoading: boolean; // Indicateur pour indiquer si les données sont en cours de chargement
  users: DirectusUser[]; // Tableau d'objets DirectusUser
  user: DirectusUser | null; // Utilisateur Directus sélectionné actuel ou null
  zones: Zone[]; // Tableau d'objets Zone
  zone: Zone | null; // Zone sélectionnée actuelle ou null
  roles: Role[]; // Tableau d'objets Role
  role: Role | null; // Rôle sélectionné actuel ou null
}

// Définir l'état initial
export const initialState: AdminState = {
  organisms: [], // Tableau vide d'objets Organism
  organism: null, // Pas d'Organism sélectionné
  isLoading: false, // Pas de chargement de données initialement
  users: [], // Tableau vide d'objets DirectusUser
  user: null, // Pas de DirectusUser sélectionné
  zones: [], // Tableau vide d'objets Zone
  zone: null, // Pas de Zone sélectionnée
  roles: [], // Tableau vide d'objets Role
  role: null, // Pas de Role sélectionné
};

// Créer une fonction asynchrone pour récupérer les Organismes de l'administration
export const fetchAdminOrganisms = createAsyncThunk(
  'admin-organisms/fetch-organisms',
  async ({
    city,
    isDisplayArchivedOrga = true,
  }: {
    city: string;
    isDisplayArchivedOrga?: boolean;
  }) => {
    // Récupérer les données depuis le serveur en utilisant axiosInstance
    const { data } = await axiosInstance.get<{ data: Organism[] }>(
      '/items/organisme',
      {
        params: {
          fields: ['id', 'name', 'address', 'visible', 'visible_comment'].join(
            ','
          ),
          filter: {
            zone_id: {
              name: city,
            },
            ...(isDisplayArchivedOrga ? {} : { visible: true }),
          },
        },
      }
    );
    return data.data;
  }
);

/**
 * Fonction asynchrone pour récupérer les Utilisateurs (tous les champs sont récupérer).
 * @param {string | null} zone - Filtre les utilisateurs d'une seule zone définit par son nom.
 */
export const fetchUsers = createAsyncThunk(
  'users/fetch-users',
  async (zone: string | null) => {
    // Récupérer les données depuis le serveur en utilisant axiosInstance
    const { data } = await axiosInstance.get<{ data: DirectusUser[] }>(
      '/users',
      {
        params: {
          fields: [
            /*         'id',
        'firstname',
        'lastname',
        'last_connected',
        'email',
        'role_id.id',
        'role_id.name',
        'zone.name', */
            '*',
          ].join(','), // Récupérer tous les champs
          filter: {
            zone, // Filtrer les données en fonction de la Zone
          },
        },
      }
    );
    return data.data; // Retourner les données récupérées
  }
);

export const setAdminOrganism = createAsyncThunk(
  'admin-organisms/set-organism',
  async (id: number) => {
    const { data } = await axiosInstance.get<{ data: Organism[] }>(
      '/items/organisme',
      {
        params: {
          fields: [
            'id',
            'name',
            'slug',
            'address',
            'city',
            'zipcode',
            'latitude',
            'longitude',
            'comment',
            'visible',
            'visible_comment',
            'pmr',
            'animals',
            'phone',
            'mail',
            'website',
            'zone_id.name',
            'schedules.id',
            'schedules.day',
            'schedules.opentime_am',
            'schedules.closetime_am',
            'schedules.opentime_pm',
            'schedules.closetime_pm',
            'schedules.closed',
            'contacts.id',
            'contacts.name',
            'contacts.comment',
            'contacts.job',
            'contacts.phone',
            'contacts.mail',
            'contacts.visibility',
            'contacts.actualisation',
            'translations.id',
            'translations.description',
            'translations.infos_alerte',
            'services.id',
            'services.categorie_id.tag',
            'services.categorie_id.id',
            'services.categorie_id.translations.name',
            'services.categorie_id.translations.slug',
            'services.categorie_id.translations.description',
            'services.categorie_id.translations.',
            'services.translations.id',
            'services.translations.name',
            'services.translations.slug',
            'services.translations.infos_alerte',
            'services.translations.description',
            'services.schedules.*',
            'services.contacts.id',
            'services.contacts.name',
            'services.contacts.comment',
            'services.contacts.job',
            'services.contacts.mail',
            'services.contacts.phone',
            'services.contacts.visibility',
            'services.contacts.actualisation',
            'date_created',
            'date_updated',
          ].join(','),
          filter: {
            id,
          },
        },
      }
    );
    return data.data[0];
  }
);

/** Récupère toutes les zones existantes en base de données, sans filtrage. */
export const fetchZones = createAsyncThunk('zones', async () => {
  const { data } = await axiosInstance.get<{ data: Zone[] }>('/items/zone');
  return data.data;
});

/** Récupère tous les rôles existants en base de données, sans filtrage.   */
export const fetchRoles = createAsyncThunk('roles', async () => {
  const { data } = await axiosInstance.get<{ data: Role[] }>('/roles');
  return data.data;
});

const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAdminOrganisms.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAdminOrganisms.fulfilled, (state, action) => {
      state.organisms = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(fetchZones.fulfilled, (state, action) => {
      state.zones = action.payload;
    })
    .addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    })
    .addCase(setAdminOrganism.fulfilled, (state, action) => {
      state.organism = action.payload;
    });
});

export default adminReducer;
