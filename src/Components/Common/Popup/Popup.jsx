import React, { useState } from 'react';
import actions from '../../../actions/PopupActions.js';
import './Popup.css';

const Popup = (props) => {
  const { isShow = false, isLoading = false, onCloseHandler = () => { }, data } = props;
  const [isOpen, setIsOpen] = useState(isShow);
  const closePopupModal = () => {
    setIsOpen(false);
    actions.closePageLoader();
    onCloseHandler();
  }

  return (<>{isOpen &&
    <><div className='popup-container'>
      {(data.type === 'loading') ? <><div className='loader-container'><div className="spin"></div></div></>
        :
        <div className='popup_inner'>
          <div className='popup-block'>
            <div className='popup-header'><img onClick={closePopupModal} src="../../../../assets/icons/close.svg" width='30px' height='30px' /></div>
            <div className='popup-body'>
              <img src={`../../../../assets/icons/${data.type}.svg`} width='30px' height='30px' />
              <div className={`${data.type}-message`}>{data.message}</div>
            </div>
          </div>
        </div>}
    </div></>}</>
  );
}

export default Popup;