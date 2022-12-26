import React, { useState } from 'react';
import _toLower from 'lodash/toLower';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMoreSubSectorOption = (props) => {
  const { sectorName = '', isEdit = false, placeholder = '', label = '', value = '', status = '', updateMoreOption = () => {} } = props;
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const addMoreoptions = async (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (status === 'success') {
      setInputValue('');
    }
  }, [status]);
  
  return (
    <div className='main__top-wrapper'>
      <div className='user_input_text flex flex-column'>
        <h1 className='main__title'>{'Sector'}</h1>
        <input type='text' name='sector' className='country__text__box' placeholder={'Enter the sector'} value={sectorName} readOnly={true} onChange={addMoreoptions} />
      </div>
      <div className='user_input_text flex flex-column'>
        <h1 className='main__title white-space'>{'SubSector'}</h1>
        <input type='text' name={_toLower(label)} className='country__text__box' placeholder={placeholder} value={inputValue} onChange={addMoreoptions} />
      </div>

      <div className='user_input_text flex flex-column'>
        <button
          className='buttons__panel-button'
          onClick={() => {
            navigate(-1);
          }}
        >
          BACK
        </button>
        <button className='main__button' onClick={() => updateMoreOption(inputValue)}>
          {isEdit ? 'EDIT' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddMoreSubSectorOption;
