import { useEffect, useState } from "react";
import s from "./Users.module.scss";
import * as api from '../../api';
import { Tooltip } from "antd";

export interface User {
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
}

export const Users = () => {
  const [users, setUsersList] = useState<User[]>([]);
  const [countUsers, setCountUsers] = useState<number>(6);
  const [endUserList, setEndUserList] = useState<boolean>(false);

  useEffect(() => {
    api.getUsers(setUsersList,setEndUserList, countUsers)
  }, [countUsers]);

  const showMoreUsers = () => {
    setCountUsers(countUsers + 6);
  };
  const renderUsers = () => {
    return users.map((user: User, index) => {
      return (
        <>
          <div className={s.userCard} key={index}>
            <img src={user.photo} alt="" />
            <p>{user.name}</p>
            <div>{user.position}</div>
            <Tooltip title={user.email}>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </Tooltip>
            <div>{user.phone}</div>
          </div>
        </>
      );
    });
  };

  return (
    <div id="users" className={s.wrapperUsers}>
      <h2>Working with GET request</h2>
      {renderUsers()}
      <div>
        <button style={{display: endUserList ? 'none' : 'block'}} onClick={showMoreUsers}>Show more</button>
      </div>
    </div>
  );
};
