import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Requests from '../../Requests';
import axios from 'axios';
import DeletePopup from '../../Components/Common/DeletePopup/DeletePopup.jsx';

const ClientUserAction = (props) => {
  const { value, index, getClientUsers = () => {}, deleteCallback } = props;

  const [isOpen, setIsopen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { orgDetails = {} } = useSelector((state) => state.signup);
  const [statusData, setStatusData] = useState({});

  const navigate = useNavigate();
  const onNavigateHandler = (url) => {
    setIsopen(false);
    navigate(url);
  };

  const onUpdateUser = async (inputValue, active_status) => {
    let user_status = 'Active';
    //Active, Invited, Disabled
    if (active_status == 1) {
      user_status = 'Active';
    } else {
      user_status = 'Disabled';
    }
    try {
      inputValue.status = user_status;
      const response = await Requests.Put(`/users/` + inputValue.id, inputValue, { organization: orgDetails.name });
      navigate('/client/users');
      setStatusData({
        type: 'success',
        message: 'Thanks! Successfully Updated'
      });
    } catch (e) {
      setStatusData({ type: 'error', message: e.message });
    }
  };
  

  return (
    <div className='more-action-contianer' onClick={() => setIsopen(false)}>
      <div
        tabIndex={index}
        className={`frametoggler`}
        onClick={(e) => {
          setIsopen(!isOpen);
          e.stopPropagation();
        }}
      >
        <img src='../../assets/icons/more-icon.svg' alt='more' width='28px' height='28px' />
      </div>
      <div className={`framedropdown framedropdown-${isOpen ? 'active' : 'inactive'}`}>
        <div>
          <a
            onClick={() => {
              navigate(`/client/users/invite`, {
                state: { userDetails: value, isEditable: true }
              });
            }}
          >
            Edit
          </a>
        </div>
        <div>
          <a onClick={() => onUpdateUser(value, 1)}>Activate</a>
        </div>
        <div>
          <a onClick={() => onUpdateUser(value, 0)}>Block</a>
        </div>
        {/* <div>
          <a onClick={() => setIsDelete(true)}>Delete</a>
        </div> */}
      </div>
      {isDelete && <DeletePopup name={'user'} isShow={isDelete} setIsDelete={setIsDelete} deleteConfirm={deleteCallback} />}
    </div>
  );
};

export default ClientUserAction;
