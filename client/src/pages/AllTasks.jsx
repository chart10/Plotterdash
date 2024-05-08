import { toast } from 'react-toastify';
import { TasksContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/tasks');
    return { data };
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const allTasksContext = createContext();

const AllTasks = () => {
  const { data } = useLoaderData();

  return (
    <allTasksContext.Provider value={{ data }}>
      <SearchContainer />
      <TasksContainer />
    </allTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(allTasksContext);
export default AllTasks;
