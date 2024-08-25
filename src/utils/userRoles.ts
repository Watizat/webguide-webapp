// userRoles.ts
import { string } from 'prop-types';
import { UserSession } from '../@types/user';

/**
 * Liste des roles d'utilisateurs existants.
 *
 * Le namespace UserRole permet d'acceder à des functions utiles sur cet enum.
 * 
 * note sur l'implémentation: Les enums n'acceptent pas les variables d'environnement. Le namespace est la meilleure solution trouvée pour contourner le problème.
 */
export enum UserRole {
  /** Administrateur : il a tous les droits. */
  Admin,
  /** Referent.e local : Doit pouvoir gerer les données concernant une branche donnée. */
  RefLocal,
  /** Editeur.ice : Doit pouvoir creer et modifier des donnes local à une branche */
  Edition,
  /** Nouveau.lle : En attente d'acceptation d'un référent ou d'un admin. Droit de lecture uniquement. */
  NewUser,
  /** Supprimé.e : En attente de suppression de la base. Plus aucun droit d'accès. */
  UserToDelete,
  /** Non définit : quand l'utilisateur n'a pas de role d'attribué. */
  NoRole,
}

/** Implemente des fonctions pour agir sur l'enum, comme par exemple des conversions. */
export namespace UserRole {
  /** Renvoi l'uuid du role passé en parametre. */
  export function getUUID(role: UserRole): string {
    switch (role) {
      case UserRole.Admin:
        return import.meta.env.VITE_ROLE_UUID_ADMIN;

      case UserRole.RefLocal:
        return import.meta.env.VITE_ROLE_UUID_REF_LOCAL;

      case UserRole.Edition:
        return import.meta.env.VITE_ROLE_UUID_EDITEUR;

      case UserRole.NewUser:
        return import.meta.env.VITE_ROLE_UUID_NOUVEAU;

      case UserRole.UserToDelete:
        return import.meta.env.VITE_ROLE_UUID_A_SUPPRIMER;

      case UserRole.NoRole:
        return 'No Role - Error';
    }
  }

 /**
  * Convertit un uuid en UserRole.
  * @param {string} uuid - Identifiant unique d'un role 
  * @returns le UserRole correspondant à un uuid. Si l'uuid ne correspond à rien alors UserRole.NoRole est renvoyé.
  */
  export function parse(uuid: string): UserRole {
    switch (uuid) {
      case import.meta.env.VITE_ROLE_UUID_ADMIN:
        return UserRole.Admin;

      case import.meta.env.VITE_ROLE_UUID_REF_LOCAL:
        return UserRole.RefLocal;

      case import.meta.env.VITE_ROLE_UUID_EDITEUR:
        return UserRole.Edition;

      case import.meta.env.VITE_ROLE_UUID_NOUVEAU:
        return UserRole.NewUser;

      case import.meta.env.VITE_ROLE_UUID_A_SUPPRIMER:
        return UserRole.UserToDelete;

      default:
        return UserRole.NoRole;
    }
  }

  /**
   * Convertit un objet UserSession en UserRole.
   * @param decodedUser 
   * @returns le UserRole correspondant à decodedUser. Si decodedUser ne correspond à rien alors UserRole.NoRole est renvoyé.
   */
  export function parseUserSession(decodedUser: UserSession): UserRole {
    if (decodedUser.role === UserRole.getUUID(UserRole.Admin)) {
      return UserRole.Admin;
    }
    if (decodedUser.role === UserRole.getUUID(UserRole.RefLocal)) {
      return UserRole.RefLocal;
    }
    if (decodedUser.role === UserRole.getUUID(UserRole.Edition)) {
      return UserRole.Edition;
    }
    if (decodedUser.role === UserRole.getUUID(UserRole.NewUser)) {
      return UserRole.NewUser;
    }
    if (decodedUser.role === UserRole.getUUID(UserRole.UserToDelete)) {
      return UserRole.UserToDelete;
    }
    return UserRole.NoRole;
  }
}

//-------------------------------------------------------------------------------
//! Pour l'utiliser :

// import React from 'react';
// import jwt_decode from 'jwt-decode';
// import { getUserRole, UserRole } from './userRoles';

// function MyComponent() {
//*  Supposons que vous avez déjà obtenu l'utilisateur depuis le stockage local
//   const localUser = getUserDataFromLocalStorage();
//   const decodedUser = jwt_decode(localUser.token.access_token) as UserSession;
//   const userRole = getUserRole(decodedUser);

//   return (
//     <div>
//       <p>User Role: {userRole}</p>
//     </div>
//   );
// }
