import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeletePopup from '../../Components/Common/Popup/DeletePopup.jsx';
import './ManageMaster.css';

const CountryAction = (props) => {
  const { name, value, index, onEdit = () => {}, onActive = () => {}, onBlock = () => {}, isSector = false, deleteCallback } = props;
  const [isOpen, setIsopen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const onNavigateHandler = (url) => {
    setIsopen(false);
    navigate(url);
  };

  return (
    <div onClick={() => setIsopen(false)} className='more-action-contianer'>
      <div
        tabindex={index}
        className={`frametoggler`}
        onClick={(e) => {
          setIsopen(!isOpen);
          e.stopPropagation();
        }}
      >
        <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' />
      </div>
      <div className={`framedropdown framedropdown-${isOpen ? 'active' : 'inactive'}`}>
        {/* <div onClick={() => { }}><a>View</a></div> */}
        <div className='lh1-5'>
          <a onClick={() => onEdit()}>Edit</a>
        </div>
        <div className='lh1-5'>
          <a onClick={() => onActive()}>Activate</a>
        </div>
        <div className='lh1-5'>
          <a onClick={() => onBlock()}>Block</a>
        </div>
        {deleteCallback && (
          <div className='lh1-5'>
            <a onClick={() => setIsDelete(true)}>Delete</a>
          </div>
        )}
        {isSector && (
          <div className='lh1-5'>
            <a
              onClick={() => {
                navigate('/subsector', { state: { sector: { ...value } } });
              }}
            >
              Add Subsector
            </a>
          </div>
        )}
      </div>
      {isDelete && <DeletePopup name={name || 'country'} isShow={isDelete} setIsDelete={setIsDelete} deleteConfirm={deleteCallback} />}
    </div>
  );
};

export default CountryAction;
