import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Categorie, Days, Organism } from '../../@types/organism';
import { axiosInstance } from '../../utils/axios';

interface OrganismsState {
  organisms: Organism[];
  filteredOrganisms: Organism[];
  categoryFilter: string[];
  isLoading: boolean;
  categories: Categorie[];
  userPosition: { lat: number; lng: number };
  organism: Organism | null;
  days: Days[];
  langue: number;
  scroll: number;
}

export const initialState: OrganismsState = {
  organisms: [],
  filteredOrganisms: [],
  categoryFilter: [],
  isLoading: false,
  categories: [],
  userPosition: { lat: 0, lng: 0 },
  organism: null,
  days: [],
  langue: 1,
  scroll: 1,
};

export const scrollCard = createAction<number>('organism/focus-card');

export const fetchCityPosition = createAsyncThunk(
  'city/position',
  async (city: string | null) => {
    let cityRequest = city;
    if (!city) {
      cityRequest = 'Toulouse';
    }
    const { data } = await axiosInstance.get('/items/zone', {
      params: {
        filter: {
          name: cityRequest,
        },
      },
    });
    return data.data[0];
  }
);

export const fetchOrganisms = createAsyncThunk(
  'organisms/fetch-organisms',
  async (city: string) => {
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
            'schedules.*',
            'contacts.name',
            'contacts.job',
            'contacts.phone',
            'contacts.mail',
            'contacts.visibility',
            'contacts.actualisation',
            'translations.id',
            'translations.description',
            'translations.infos_alerte',
            'services.categorie_id.id',
            'services.categorie_id.tag',
            'services.categorie_id.translations.id',
            'services.categorie_id.translations.name',
            'services.categorie_id.translations.slug',
            'services.categorie_id.translations.description',
            'services.categorie_id.translations',
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
            'services.contacts.name',
            'services.contacts.job',
            'services.contacts.mail',
            'services.contacts.phone',
            'services.contacts.visibility',
            'services.contacts.actualisation',
          ].join(','),
          filter: {
            zone_id: {
              name: { _icontains: city },
            },
          },
        },
      }
    );
    return data.data;
  }
);

export const fetchDays = createAsyncThunk(
  'organisms/fetch-days',
  async (langue_id: number) => {
    const { data } = await axiosInstance.get<{ data: Days[] }>(
      '/items/day_translation',
      {
        params: {
          fields: ['name', 'numberday'],
          filter: { langue: langue_id },
          sort: 'numberday',
        },
      }
    );
    return data.data;
  }
);

export const fetchOrganism = createAsyncThunk(
  'organisms/fetch-organism',
  async (slug: string) => {
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
            'schedules.*',
            'contacts.name',
            'contacts.job',
            'contacts.phone',
            'contacts.mail',
            'contacts.visibility',
            'contacts.actualisation',
            'translations.id',
            'translations.description',
            'translations.infos_alerte',
            'services.id',
            'services.categorie_id.id',
            'services.categorie_id.tag',
            'services.categorie_id.translations.name',
            'services.categorie_id.translations.slug',
            'services.categorie_id.translations.description',
            'services.categorie_id.translations',
            'services.translations.id',
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
            slug: `${slug}`,
          },
        },
      }
    );
    if (data.data.length === 0) {
      return null;
    }
    return data.data[0];
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetch-categories',
  async () => {
    const { data } = await axiosInstance.get<{ data: Categorie[] }>(
      '/items/categorie?fields=id,tag,translations.name,translations.slug',
      {
        params: {
          sort: 'translations.name',
        },
      }
    );
    return data.data;
  }
);

export const filterCategories = createAction<string[]>(
  'categories/filter-categories'
);

export const setOrganisms = createAction<Organism[]>(
  'organims/filter-organims'
);

export const setFilteredOrganisms = createAction<Organism[]>(
  'organims/filtered-organims'
);

export const setUserPosition = createAction<{ lat: number; lng: number }>(
  'position/user-position'
);

const organismReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOrganisms.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(scrollCard, (state, action) => {
      state.scroll = action.payload;
    })
    .addCase(fetchOrganisms.fulfilled, (state, action) => {
      state.organisms = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOrganisms.rejected, (state, action) => {
      state.isLoading = false;
      // eslint-disable-next-line no-console
      // console.log(action.payload);
    })
    .addCase(fetchOrganism.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOrganism.fulfilled, (state, action) => {
      state.organism = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchDays.fulfilled, (state, action) => {
      state.days = action.payload;
    })
    .addCase(setOrganisms, (state, action) => {
      state.organisms = action.payload;
    })
    .addCase(setFilteredOrganisms, (state, action) => {
      state.filteredOrganisms = action.payload;
    })
    .addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
    .addCase(filterCategories, (state, action) => {
      state.categoryFilter = action.payload;
    })
    .addCase(setUserPosition, (state, action) => {
      state.userPosition = action.payload;
    });
});

export default organismReducer;
