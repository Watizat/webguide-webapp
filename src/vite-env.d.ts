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
  readonly VITE_ROLE_UUID_ADMIN: string;
  readonly VITE_ROLE_UUID_REF_LOCAL: string;
  readonly VITE_ROLE_UUID_EDITEUR: string;
  readonly VITE_ROLE_UUID_NOUVEAU: string;
  readonly VITE_ROLE_UUID_A_SUPPRIMER: string;
}
