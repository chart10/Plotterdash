import Wrapper from '../assets/wrappers/Navbar';
import { CgSidebar } from 'react-icons/cg';
import LogoLightSmall from './LogoLightSmall';
import LogoutContainer from './LogoutContainer';
import { useDashboardContext } from '../pages/DashboardLayout';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <CgSidebar />
        </button>
        <div>
          <LogoLightSmall />
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
