import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import AxiosInstance from 'axios';
import { Organism, Role, User, Zone } from '../../@types/organism';

interface AdminState {
  organisms: Organism[];
  organism: Organism | null;
  isLoading: boolean;
  users: User[];
  user: User | null;
  zones: Zone[];
  zone: Zone | null;
  roles: Role[];
  role: Role | null;
}

export const initialState: AdminState = {
  organisms: [],
  organism: null,
  isLoading: false,
  users: [],
  user: null,
  zones: [],
  zone: null,
  roles: [],
  role: null,
};

export const fetchAdminOrganisms = createAsyncThunk(
  'admin-organisms/fetch-organisms',
  async () => {
    const { data } = await AxiosInstance.get<{ data: Organism[] }>(
      'https://watizat.lunalink.nl/items/organisme',
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
            'pmr',
            'animals',
            'phone',
            'mail',
            'website',
            'zone_id.name',
            'schedules.day',
            'schedules.opentime_am',
            'schedules.closetime_am',
            'schedules.opentime_pm',
            'schedules.closetime_pm',
            'schedules.closed',
            'contacts.id',
            'contacts.name',
            'contacts.job',
            'contacts.phone',
            'contacts.mail',
            'contacts.visibility',
            'contacts.actualisation',
            'translations.id',
            'translations.description',
            'translations.infos_alerte',
            'services.categorie_id.tag',
            'services.categorie_id.translations.name',
            'services.categorie_id.translations.slug',
            'services.categorie_id.translations.description',
            'services.categorie_id.translations.',
            'services.translations.name',
            'services.translations.slug',
            'services.translations.infos_alerte',
            'services.translations.description',
            'services.schedules.day',
            'services.schedules.opentime_am',
            'services.schedules.closetime_am',
            'services.schedules.opentime_pm',
            'services.schedules.closetime_pm',
            'services.schedules.closetime_pm',
            'services.contacts.id',
            'services.contacts.name',
            'services.contacts.job',
            'services.contacts.mail',
            'services.contacts.phone',
            'services.contacts.visibility',
            'services.contacts.actualisation',
          ].join(','),
          filter: {
            zone_id: {
              name: 'Toulouse',
            },
            /* services: {
              categorie_id: {
                translations: {
                  slug: `${category}`,
                },
              },
            }, */
          },
        },
      }
    );
    return data.data;
  }
);

export const fetchUsers = createAsyncThunk('users/fetch-users', async () => {
  const { data } = await AxiosInstance.get<{ data: User[] }>(
    'https://watizat.lunalink.nl/items/user',
    {
      params: {
        fields: [
          'id',
          'firstname',
          'lastname',
          'last_connected',
          'email',
          'role_id.id',
          'role_id.name',
          'zone.name',
        ].join(','),
      },
    }
  );
  return data.data;
});

export const setAdminOrganism = createAction<Organism>(
  'admin-organisms/set-organism'
);

export const fetchZones = createAsyncThunk('zones', async () => {
  const { data } = await AxiosInstance.get<{ data: Zone[] }>(
    'https://watizat.lunalink.nl/items/zone'
  );
  return data.data;
});

export const fetchRoles = createAsyncThunk('roles', async () => {
  const { data } = await AxiosInstance.get<{ data: Role[] }>(
    'https://watizat.lunalink.nl/items/role'
  );
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
    .addCase(setAdminOrganism, (state, action) => {
      state.organism = action.payload;
    });
});

export default adminReducer;