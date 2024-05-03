import { Link } from 'react-router-dom';
import { LogoLightSmall, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <LogoLightSmall />
        <h4>Register</h4>
        <FormRow
          type='text'
          name='name'
          labelText='First Name'
          defaultValue='Christian'
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last Name'
          defaultValue='Hart'
        />
        <FormRow type='email' name='email' defaultValue='chich@gmail.com' />
        <FormRow type='password' name='password' defaultValue='12345' />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
