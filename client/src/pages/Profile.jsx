import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    toast.error('File size is too large');
    return null;
  }
  console.log(formData);
  try {
    await customFetch.patch('/user/edit-user', formData);
    toast.success('Profile updated');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const { user } = useOutletContext();
  const { firstName, lastName, email } = user;
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className='form-cetner'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow
            type='text'
            name='firstName'
            labelText='first name'
            defaultValue={firstName}
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={lastName}
          />
          <FormRow type='text' name='email' defaultValue={email} />
          <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
