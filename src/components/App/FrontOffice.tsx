import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Footer from '../FrontOffice/Footer/Footer';
import Header from '../FrontOffice/Header/Default';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchZones } from '../../store/reducers/admin';
import { fetchCategories, fetchDays } from '../../store/reducers/organisms';

export default function FrontApp() {
  const isTablet = useMediaQuery({ query: '(min-width: 769px)' });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const langue = useAppSelector((state) => state.organism.langue);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchZones());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDays(1));
  }, [dispatch, langue]);

  return (
    <div
      id="App"
      className="relative flex flex-col min-h-full overflow-y-hidden md:overflow-auto"
    >
      {!loading && (
        <>
          <Header />
          <Outlet />
          {isTablet && <Footer />}
        </>
      )}
    </div>
  );
}
