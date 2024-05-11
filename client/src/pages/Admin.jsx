import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    console.log('Hello from the admin page loader');
    const response = await customFetch.get('/user/admin/app-stats');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { users, tasks } = useLoaderData();
  console.log(users, tasks);

  return (
    <Wrapper>
      <h2>Admin Page</h2>
      <p>Users: {users}</p>
      <p>Tasks: {tasks}</p>
    </Wrapper>
  );
};
export default Admin;
