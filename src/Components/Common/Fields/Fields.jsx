import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import './Fields.css';
import { useEffect } from 'react';

const Input = (props) => (
  <>
    {props.label && (
      <h1 className={props.labelCls || 'create-framework__title'}>
        {props.label}
        {props.required && <span className='color-red P-4'>*</span>}
      </h1>
    )}
    <div className={props.inputblockcls}>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        maxLength={props.maxLength}
        onChange={props.onChangeHandler}
        className={props.className}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.isEditable}
        readOnly={props.readOnly}
      />
      {!_isEmpty(props.error) ? <div className='error-msg'>{props.error}</div> : null}
    </div>
  </>
);

const TextArea = (props) => {
  return (
    <>
      {props.label && (
        <h1 className='create-framework__title'>
          {props.label}
          {props.required && <span className='color-red P-4'>*</span>}
        </h1>
      )}
      <div className={props.inputblockcls}>
        <TextAreaBox {...props} />
        {!_isEmpty(props.error) ? <div className='error-msg'>{props.error}</div> : null}
      </div>
    </>
  );
};

const Pills = (props) => (
  <>
    {props.label && (
      <h1 className='create-framework__title'>
        {props.label}
        {props.required && <span className='color-red P-4'>*</span>}
      </h1>
    )}
    <ul className='assign__categories'>
      {(props.data || []).map((subItem, index) => (
        <li
          key={index}
          onClick={() => props.onSelectMultipleOption(index)}
          className={`assign__categories-item ${subItem.isSelect === true || props.allSelect ? 'active' : 'inactive'}`}
        >
          {subItem.name}
        </li>
      ))}
    </ul>
  </>
);

const UploadFile = (props) => (
  <>
    <h1 className='create-framework__title'>
      {props.label}
      {props.required && <span className='color-red P-4'>*</span>}
    </h1>
    <form className='add__logo-form upload-cover'>
      <div className='add__logo-logo'>{props.imageUrl ? <img src={props.imageUrl} alt='' className={props.imgcls} /> : null}</div>
      <label htmlFor='add__logo' className='add__logo-label'>
        <span>Upload</span>
      </label>
      <input type='file' onChange={props.onChangeFile} name='logo' className='add__logo-input' id='add__logo' accept='.jpg, .jpeg, .png' />
      {props.logoSizeError && (
        <label className='logo-size-error'>
          <span>* File size should not exceed 1mb.</span>
        </label>
      )}
    </form>
  </>
);

const DocumentUpload = (props) => (
  <>
    <h1 className='create-framework__title'>
      {props.label}
      {props.required && <span className='color-red P-4'>*</span>}
    </h1>
    <form className='add__logo-form document-upload-container'>
      <div className='add__logo-logo'>{props.imageUrl ? <img src={props.imageUrl} alt='' className={props.imgcls} /> : null}</div>
      <label htmlFor='add__logo' className='add__logo-label'>
        <span>Choose File</span>
      </label>
      <input type='file' onChange={props.onChangeFile} name='logo' className='add__logo-input' id='add__logo' accept='.jpg, .jpeg, .png' />
      <span>|</span>
      <label className='remove__logo-label'>
        <span onClick={props.onChangeRemoveFile}>Remove</span>
      </label>
      <div>
        <button type='button' onClick={() => props.fileUploadHandler()} className='document-upload'>
          Upload
        </button>
        {/* {props.logoSizeError || true &&<label className="logo-size-error"><span>* File size should not more than 1mb.</span>
            </label>} */}
      </div>
    </form>
  </>
);

const Button = (props) => (
  <button onClick={props.onClickHandler} className={props.className}>
    {props.label}
  </button>
);

const Dropdown = (props) => {
  return (
    <select className={props.className_1} disabled={props.isEditable ? 'disabled' : ''} name={props.name || ''} value={props.value} onChange={props.onChangeHandler}>
      {(props.options || []).map((option) => (
        <option className={props.className_2} value={option.value} selected={option.value === props.value ? 'selected' : null}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const RadioButton = (props) => {
  const { changed = () => {}, id = null, isSelected = false, label = 'RadioButton', value = 'RadioButton' } = props;
  return (
    <div className='RadioButton'>
      <input id={id} onChange={changed} value={value} type='radio' checked={isSelected} />
      <label htmlFor={id} className='radio-label'>
        {label}
      </label>
    </div>
  );
};

const InputBox = (props) => {
  const {
    type = 'text',
    name = 'name',
    value = '',
    onChangeHandler = () => {},
    className = 'framework__input',
    placeholder = '',
    required = false,
    disabled = false,
    maxLength = ''
  } = props;
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChangeHandler}
      className={className}
      placeholder={placeholder}
      maxLength={maxLength}
      required={disabled}
      disabled={disabled}
    />
  );
};

const TextAreaBox = (props) => (
  <textarea
    {...props}
    value={props.value}
    onChange={props.onChangeHandler}
    name={props.name}
    className={`${props.className} create-framework__textarea`}
    required={props.required}
    disabled={props.isEditable}
  ></textarea>
);

const Label = (props) => {
  const { label = '', className = 'framework__title', required = false, requireCls = 'P-4' } = props;
  return (
    <h1 className={className}>
      {label}
      {required && <span className={`color-red ${requireCls}`}>*</span>}
    </h1>
  );
};

export default {
  Input,
  TextArea,
  Pills,
  UploadFile,
  Button,
  Dropdown,
  RadioButton,
  InputBox,
  Label,
  TextAreaBox,
  DocumentUpload
};
