import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './App.scss';

function App() {
  /* async function fetchData() {
    const { data } = await axios.get(
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
                  slug: 'manger',
                },
              },
            },
          },
        },
      }
    );
    console.log(data); 
  }
  */

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
