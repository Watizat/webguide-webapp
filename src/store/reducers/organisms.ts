import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import AxiosInstance from 'axios';
import { Organism } from '../../@types/organism';

interface OrganismsState {
  organisms: Organism[];
  categoryFilter: string;
  isLoading: boolean;
}

export const initialState: OrganismsState = {
  organisms: [],
  categoryFilter: '',
  isLoading: false,
};

export const fetchOrganisms = createAsyncThunk(
  'organisms/fetch-organisms',
  async (category: string) => {
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
            'schedules',
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
          ],
          filter: {
            zone_id: {
              name: 'Toulouse',
            },
            services: {
              categorie_id: {
                translations: {
                  slug: `${category}`,
                },
              },
            },
          },
        },
      }
    );
    return data.data;
  }
);

const organismReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOrganisms.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOrganisms.fulfilled, (state, action) => {
      state.organisms = action.payload;
      state.isLoading = false;
      // console.log(state.organisms);
    });
});

export default organismReducer;