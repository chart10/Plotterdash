import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Task';
import TaskInfo from './TaskInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const Task = ({ _id, title, details, category, complete, createdAt }) => {
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'></div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{category}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <TaskInfo icon={<FaLocationArrow />} text={details} />
          <TaskInfo icon={<FaBriefcase />} text={complete} />
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${category}`}>{category}</div>
        </div>
        <footer className='actions'>
          <Link to={`/dashboard/edit-task/${_id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`./delete-task/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Task;
