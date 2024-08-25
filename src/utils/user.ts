import { AuthResponse } from '../@types/user';

/** Retrieve 'user' item from local storage or null if nobody is connected or if user data is corrupted. */
export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  try {
    const userData = userDataStr
      ? (JSON.parse(userDataStr) as {
          token: AuthResponse;
          isActive: boolean;
          lastActionDate: number | null;
        })
      : null;
    return userData;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

/** Remove 'user' item from local storage. */
export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
