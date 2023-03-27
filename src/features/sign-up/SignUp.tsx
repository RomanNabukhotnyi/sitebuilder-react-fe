import { Link } from 'react-router-dom';

import { SignUpForm } from './components/SignUpForm/SignUpForm';

import './SignUp.scss';

export function SignUp() {

  return (
    <div className="p-sign-up">
      <div className="illustration">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" alt="sign-up"/>
      </div>
      <div className="content">
        <h1>Welcome to SiteBuilder!</h1>
        <p>We're so happy you're here, let’s start by signing up.</p>
        <hr />
        <SignUpForm />
        <hr />
        <div className="footer">
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
