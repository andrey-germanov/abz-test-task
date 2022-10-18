import LoginButton from '../../Auth0/LoginButton'
import s from './Header.module.scss';
import logo from '../../images/logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../Auth0/LogoutButton';
import Profile from '../../Auth0/Profile';

export const Header = () => {
    const { isAuthenticated } = useAuth0();
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logoWrapper}><img src={logo} alt="" />TESTTASK</div>
        <div>
            <Profile />
            <a href="#users">Users</a>
            {!isAuthenticated ? <LoginButton/> : <LogoutButton/>}
        </div>
      </div>
    </header>
  )
}
