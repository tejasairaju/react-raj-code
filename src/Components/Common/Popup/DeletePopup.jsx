import React, { useState } from 'react';
import actions from '../../../actions/PopupActions.js';
import './Popup.css';

const DeletePopup = (props) => {
  const {
    isShow = false,
    isLoading = false,
    onCloseHandler = () => {},
    data,
    name,
    deleteConfirm,
    setIsDelete,
  } = props;
  const [isOpen, setIsOpen] = useState(isShow);
  const closePopupModal = () => {
    setIsOpen(false);
    actions.closePageLoader();
    onCloseHandler();
  };

  return (
    <>
      {isOpen && (
        <>
          <div className='popup-container'>
            <div className='popup_inner'>
              <div className='popup-block'>
                <div className='popup-header'>
                  <img
                    onClick={() => setIsDelete(false)}
                    src='../../../../assets/icons/close.svg'
                    width='30px'
                    height='30px'
                  />
                </div>
                <div className='popup-body'>
                  <div className='flex flex-col w-full'>
                    <div>{`Are you sure? Do you want to delete this ${name}?`}</div>
                    <div className='flex mt-2 align-middle py-3 justify-end'>
                      <a
                        className='mt-2 self-center'
                        onClick={() => setIsDelete(false)}
                      >
                        Cancel
                      </a>
                      <button
                        onClick={() => {
                          setIsDelete(false);
                          deleteConfirm();
                        }}
                        className='main__button'
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeletePopup;
