import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import { IoCloseSharp } from 'react-icons/io5';
import LogoLightSmall from './LogoLightSmall';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';

const SmallSideBar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <IoCloseSharp />
          </button>
          <header>
            <LogoLightSmall />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSideBar;
