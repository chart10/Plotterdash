import { IoMdSunny } from 'react-icons/io';
import { IoIosMoon } from 'react-icons/io';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <IoIosMoon className='toggle-icon' />
      ) : (
        <IoMdSunny className='toggle-icon' />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
