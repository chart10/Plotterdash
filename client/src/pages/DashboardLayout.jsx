import { useContext, createContext, useState } from 'react';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { BigSideBar, SmallSideBar, Navbar } from '../components';
import { checkDefaultTheme } from '../App';
import Wrapper from '../assets/wrappers/Dashboard';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/user/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const dashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    console.log('toggle sidebar');
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user');
  };

  return (
    <dashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </dashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(dashboardContext);
export default DashboardLayout;
