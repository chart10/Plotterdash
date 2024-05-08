import Wrapper from '../assets/wrappers/TaskInfo';

const TaskInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='task-icon'>{icon}</span>
      <span className='task-text'>{text}</span>
    </Wrapper>
  );
};
export default TaskInfo;
