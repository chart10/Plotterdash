import Task from './Task';
import Wrapper from '../assets/wrappers/TasksContainer';
import { useAllTasksContext } from '../pages/AllTasks';

const TasksContainer = () => {
  const { data } = useAllTasksContext();
  const { allTasks } = data;
  if (allTasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className='tasks'>
        {allTasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};
export default TasksContainer;
