import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { UserMenu } from './components/UserMenu/UserMenu';

import './Main.scss';

export function Main() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const user = {
    id: 1,
    email: 'test@gmail.com',
  };

  const handleLogout = async () => {
    // await authStore.logout();
    navigate('/login');
  };
  
  return (
    <div className="p-main">
      <header>
        <div className="icon">
          <Link to={'/projects'}>
            <img width="36" height="29" src="https://static.thenounproject.com/png/2317669-200.png" alt="logo" />
          </Link>
        </div>
        <div className="title">Workspace</div>
        <div id="avatar" className="avatar" onClick={() => setMenuVisible(true)}>
          <img
            src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
            width="28"
            height="28"
            alt="avatar"
          />
        </div>
        <UserMenu show={menuVisible} user={user} handleLogout={handleLogout} handleClose={() => setMenuVisible(false)} />
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
