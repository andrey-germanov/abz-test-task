import { useAuth0, User } from "@auth0/auth0-react";
import { Tooltip } from "antd";
import s from './Style.module.scss';

const Profile = () => {
  const { user, isAuthenticated, isLoading }: User = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <>
        {isAuthenticated ?
          <Tooltip title={user.name}>
              <div className={s.userInfo}>
                  <img src={user.picture} alt={user.name} />
              </div>
          </Tooltip>
            : ''
        }
      </>
  );
};

export default Profile;