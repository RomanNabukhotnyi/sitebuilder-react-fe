import type { ApiUser } from '../../../../types/users/ApiUser';

import './UserMenu.scss';

interface IProps {
  user: ApiUser;
  handleLogout: () => void;
  handleClose: () => void;
  show: boolean;
}

export function UserMenu({ user, handleLogout, handleClose, show }: IProps) {
  return (
    <>
      {show && (
        <div className="u-main-user-menu">
          <div className="overlay" onClick={handleClose} />
          {/* <Transition v-if="show" name="menu"> */}
          <div className="menu">
            <div className="email">{user?.email}</div>
            <div className="action" onClick={handleLogout}>
              Log out
            </div>
          </div>
          {/* </Transition> */}
        </div>
      )}
    </>
  );
}
