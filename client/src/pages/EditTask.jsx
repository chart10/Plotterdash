import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { TASK_STATUS } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/tasks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-tasks');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.patch(`/tasks/${params.id}`, data);
    toast.success('Task successfully updated');
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.mdg);
    return error;
  }
};

const EditTask = () => {
  const { task } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(task);
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Task</h4>
        <div className='form-content'>
          <FormRow type='text' name='title' defaultValue={task.title} />
          <FormRow type='text' name='details' defaultValue={task.details} />
          <FormRowSelect
            name='category'
            defaultValue={task.category}
            list={Object.values(TASK_STATUS)}
          />
          <button
            type='submit'
            className='btn form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditTask;
