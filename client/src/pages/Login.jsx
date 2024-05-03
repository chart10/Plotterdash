import { Link } from 'react-router-dom';
import { LogoLightSmall, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <LogoLightSmall />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='chich@gmail.com' />
        <FormRow type='password' name='password' defaultValue='12345' />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          Don&apos;t have an account? <Link to='/register'>Register</Link> here
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
