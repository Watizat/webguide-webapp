/// <reference types="vite/client" />

/** 
 * Definition des variables d'environnement pour l'autocompletion Intellisense.
 *
 * Utiliser import.meta.env pour importer les variables.
 * 
 * Plus d'informations sur https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
*/
interface ImportMetaEnv {
  readonly VITE_WEB_GUIDE_URL: string;
  readonly VITE_BACKEND_URL: string;
}
