import React, { useState } from 'react';
import './Modal.css'

const Modal = ({ isShow = false, children = null, closeModal = () => { }, isDisclosureDec = false }) => {
  const [isOpen, setIsOpen] = useState(isShow);
  const closePopupModal = () => {
    setIsOpen(false);
    closeModal();
  }

  let imageUrl = '';
  if(isDisclosureDec) {
    imageUrl = '../../../../assets/icons/close.svg';
  } else {
    imageUrl='../../../assets/icons/close.svg';
  }

  return (isOpen && <div className='modal-popup-container'>
    <div className='modal-popup_inner'>
      <div className='modal-popup-block'>
        <div className='modal-popup-header'><span className='close-modal-popup'><img onClick={() => closePopupModal()} src={imageUrl} width='24px' height='24px' /></span></div>
        <div className='modal-popup-body'>
          {children}
        </div>
      </div>
    </div>
  </div>);
}

export default Modal;