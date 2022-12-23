import React, { useState, useEffect } from 'react';
import _toLower from 'lodash/toLower';

const AddMoreOption = (props) => {
  const { isEdit = false, placeholder = '', label = '', value = '', status = '', updateMoreOption = () => {} } = props;
  const [inputValue, setInputValue] = useState('');

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
        <h1 className='main__title'>{label} :</h1>
        <input type='text' name={_toLower(label)} className='country__text__box' placeholder={placeholder} value={inputValue} onChange={addMoreoptions} />
      </div>
      <button className='main__button' onClick={() => updateMoreOption(inputValue)}>
        {isEdit ? 'EDIT' : 'ADD'}
      </button>
    </div>
  );
};

export default AddMoreOption;
