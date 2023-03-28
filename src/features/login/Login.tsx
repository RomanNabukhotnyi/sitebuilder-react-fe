import { Link } from 'react-router-dom';

import { LoginForm } from './components/LoginForm/LoginForm';

import './Login.scss';

export function Login() {
  return (
    <div className="p-login">
      <div className="illustration">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" alt='login' />
      </div>
      <div className="content">
        <h1>Great to have you here!</h1>
        <p>You can login to access your workspace.</p>
        <hr />
        <LoginForm />
        <hr />
        <div className="footer">
          <span className="footer">
            No account yet? <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
