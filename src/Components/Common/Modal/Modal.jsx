import React, { useState } from 'react';
import './Modal.css'

const Modal = ({ isShow = false, children = null, closeModal = () => { } }) => {
  const [isOpen, setIsOpen] = useState(isShow);
  const closePopupModal = () => {
    setIsOpen(false);
    closeModal();
  }

  return (isOpen && <div className='modal-popup-container'>
    <div className='modal-popup_inner'>
      <div className='modal-popup-block'>
        <div className='modal-popup-header'><span className='close-modal-popup'><img onClick={() => closePopupModal()} src="assets/icons/close.svg" width='24px' height='24px' /></span></div>
        <div className='modal-popup-body'>
          {children}
        </div>
      </div>
    </div>
  </div>);
}

export default Modal;