import axios from 'axios';

const apiKey = '7d4f63fb-110c-4cc3-a5ee-aa4b382e0865'; // Remplacez "YOUR_API_KEY" par votre clé d'API Navitia

const navitiaInstance = axios.create({
  baseURL: 'https://api.navitia.io/v1', // URL de base de l'API Navitia
  headers: {
    Authorization: `${apiKey}`,
    // Autres en-têtes si nécessaire
  },
});

export default navitiaInstance;