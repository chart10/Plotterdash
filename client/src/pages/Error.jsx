import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage.js';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='404 not found' />
          <h3>Uh oh! Page not found!</h3>
          <p>It seems the page you were looking for does not exist.</p>
          <Link to='/dashboard'>Back to Dashboard</Link>
        </div>
      </Wrapper>
    );
  }
  console.log(error);
  return (
    <div>
      <h1>Something went wrong!</h1>
      <Link to='/'>Back Home</Link>
    </div>
  );
};
export default Error;
