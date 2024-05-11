import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`tasks/${params.id}`);
    toast.success('Task deleted');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard');
};

const DeleteTask = () => {
  return <div>DeleteTask</div>;
};
export default DeleteTask;
