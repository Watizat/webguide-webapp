/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRoles, fetchZones } from '../../store/reducers/admin';
import { fetchCategories, fetchDays } from '../../store/reducers/organisms';
import { axiosInstance } from '../../utils/axios';
import { getUserDataFromLocalStorage } from '../../utils/user';
import { UserRole, getUUID } from '../../utils/userRoles';
import { changeAdmin } from '../../store/reducers/user';
import NoMobile from '../Errors/NoMobile';
import Sidebar from '../BackOffice/Sidebar/SideBase';
import Header from '../BackOffice/Header';
import BackOfficeContext from '../../context/BackOfficeContext';

/**
 * 
 * @returns Back office application. This is the view for Watizat members which allow them to edit data.
 * @property {boolean} isTablet    - Set to true if device is a tablet. Used for responsiveness 
 * @property {object} dispatch     - 
 * @property {object | null} user  - User login informations or null if not logged.
 * @property {string} pathname     - Current url in web-browser.
 * @property {number} langue       - Id of the current language. (??)
 * @property {boolean} isLoading   - Set to true if the state is loaded.
 * @property {boolean} sidebarOpen - Set to true if the sidebar is open
 */ 
export default function App() {
  const isTablet = useMediaQuery({ query: '(min-width: 769px)' });
  const dispatch = useAppDispatch();
  const user = getUserDataFromLocalStorage();
  const { pathname } = useLocation();
  const langue = useAppSelector((state) => state.organism.langue);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDays(1));
  }, [dispatch, langue]);

  useEffect(() => {
    dispatch(fetchZones());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    async function check() {
      setIsLoading(true);
      const { data } = await axiosInstance.get('/users/me');

      // User en attente de validation
      if (data.data.role === getUUID(UserRole.NewUser)) {
        setIsLoading(false);
        return navigate('/new-user');
      }
      // Users en attente de supression
      if (data.data.role === getUUID(UserRole.UserToDelete)) {
        setIsLoading(false);
        return navigate('/');
      }
      if (data.data.role === getUUID(UserRole.Admin)) {
        dispatch(changeAdmin(true));
      }
      setIsLoading(false);
      return <Navigate to="/admin/dashboard" replace />;
    }
    check();
  }, [navigate, dispatch]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (pathname === '/admin' || pathname === '/admin/') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <BackOfficeContext>
      {isTablet ? (
        <>
          {!isLoading && (
            <>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div
                className={` flex flex-col flex-1  lg:pl-20 ${
                  pathname !== '/admin/dashboard' && '2xl:pl-72 '
                } ${
                  pathname === '/admin/dashboard' ||
                  pathname === '/admin/profil'
                    ? 'h-full min-h-full'
                    : 'h-max min-h-max'
                }`}
              >
                <Header setSidebarOpen={setSidebarOpen} />
                <Outlet />
              </div>
            </>
          )}
        </>
      ) : (
        <NoMobile />
      )}
    </BackOfficeContext>
  );
}
