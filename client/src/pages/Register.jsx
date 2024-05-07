import { Form, redirect, Link, useNavigation } from 'react-router-dom';
import { LogoLightSmall, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    console.log(error.response.data.msg);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <LogoLightSmall />
        <h4>Register</h4>
        <FormRow type='username' name='username' defaultValue='chich' />
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
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
