// userRoles.ts
import { UserSession } from '../@types/user';

/** Définition des identifiants des roles. Les ID doivent correspondre à la base de données. */
export enum UserRole {
  Admin = '53de6ec2-6d70-48c8-8532-61f96133f139',
  RefLocal = '4a30876c-cea0-455f-92d0-593212918aaf',
  Edition = '37a801a9-4ddf-43d8-ac1b-2a122a3feaf5',
  NewUser = '5754603f-add3-4823-9c77-a2f9789074fc',
  UserToDelete = 'fd46fe69-2a5d-4742-a536-cfad86d3e81f',
  NoRole = 'No Role - Error',
}

export function getUserRole(decodedUser: UserSession): UserRole {
  if (decodedUser.role === UserRole.Admin) {
    return UserRole.Admin;
  }
  if (decodedUser.role === UserRole.RefLocal) {
    return UserRole.RefLocal;
  }
  if (decodedUser.role === UserRole.Edition) {
    return UserRole.Edition;
  }
  if (decodedUser.role === UserRole.NewUser) {
    return UserRole.NewUser;
  }
  if (decodedUser.role === UserRole.UserToDelete) {
    return UserRole.UserToDelete;
  }
  return UserRole.NoRole;
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
