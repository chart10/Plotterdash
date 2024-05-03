import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { LogoLight } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <LogoLight />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Your <span>world</span> here
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            illum, voluptates nostrum architecto numquam iusto laboriosam eos
            maxime, ea possimus a quisquam facere. Vitae illo, qui magni
            reiciendis quasi harum?
          </p>
          <Link to='register' className='btn register-link'>
            Register
          </Link>
          <Link to='login' className='btn login-link'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
      <div className='content'>some content</div>
    </Wrapper>
  );
};

export default Landing;
