import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserListView.css';
import axios from 'axios';
import Requests from '../../Requests';
import { getProfilePhoto } from '../../utils/utils';

const UserListView = (props) => {
  const { onClickUserSelect = () => {} } = props;
  const { orgDetails = {} } = useSelector((state) => state.signup);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const response = await Requests.Get(`/users/`, {
        organization: orgDetails.name,
      });
      setUserList([...response.results]);
    } catch (e) {
      setUserList([]);
    }
  };

  const onClickHandler = (index, user) => {
    let cloneUserList = [...userList];
    cloneUserList = (cloneUserList || []).map((item, i) => {
      if (i === index) {
        item['isSelected'] = !item['isSelected'];
      } else {
        item['isSelected'] = false;
      }
      return item;
    });
    setUserList([...cloneUserList]);
    onClickUserSelect(user);
  };

  return (
    <div className='user__wrapper user-wrapper-scroll'>
      <div className='left__arrow'></div>
      {(userList || []).map((user, i) => {
        return (
          !(user.status == "Disabled") && (
            <div
              key={i}
              onClick={() => onClickHandler(i, user)}
              className={`user__container ${user.isSelected ? 'active' : null}`}
            >
              {/* <img src='../../assets/images/user-avatar.svg' width={'30px'} height={'30px'} alt="avatar" /> */}
              <span className='user-details-picture'>
                {getProfilePhoto(user)}
              </span>
              <div>
                <p className='user-name'>
                  <span>
                    <b>Name</b>
                  </span>
                  {user.first_name}&nbsp;{user.last_name}
                </p>
                <p className='job-title'>
                  <span>
                    <b>Role</b>
                  </span>
                  {user.role}
                </p>
              </div>
            </div>
          )
        );
      })}
      <div className='right__arrow'></div>
    </div>
  );
};

export default UserListView;
