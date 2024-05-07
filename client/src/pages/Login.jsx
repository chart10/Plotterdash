import { Form, redirect, Link, useNavigation } from 'react-router-dom';
import { LogoLightSmall, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  console.log('hello');
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <LogoLightSmall />
        <h4>Login</h4>
        <FormRow
          type='email_username'
          name='email_username'
          defaultValue='chich@gmail.com'
        />
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
      </Form>
    </Wrapper>
  );
};
export default Login;
