import React, { useState } from "react";
import _isEmpty from 'lodash/isEmpty';
import './Fields.css';
import { useEffect } from "react";

const Input = (props) => (
    <>
        {props.label && <h1 className="create-framework__title">{props.label}{props.required&&<span className="color-red P-4">*</span>}</h1>}
        <div className={props.inputblockcls}>
            <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChangeHandler}
            className={props.className}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.isEditable}        
        />
        {!_isEmpty(props.error)?<div className='error-msg'>{props.error}</div>: null}
        </div>
    </>);

const TextArea = (props) => (
    <>
        {props.label && <h1 className="create-framework__title">{props.label}{props.required&&<span className="color-red P-4">*</span>}</h1>}
        <div className={props.inputblockcls}>
        <textarea
            {...props}
            value={props.value}
            onChange={props.onChangeHandler}
            name={props.name}
            className={`${props.className} create-framework__textarea`}
            required={props.required}
            disabled={props.isEditable}>
        </textarea>
        {!_isEmpty(props.error)?<div className='error-msg'>{props.error}</div>: null}
        </div>
    </>
)

const Pills = (props) => (
    <>
        {props.label && <h1 className="create-framework__title">{props.label}{props.required&&<span className="color-red P-4">*</span>}</h1>}
        <ul className="assign__categories">
            {(props.data || []).map((subItem, index) => <li key={index} onClick={() => props.onSelectMultipleOption(index)} className={`assign__categories-item ${(subItem.isSelect === true || props.allSelect) ? 'active' : ''}`}>
                {subItem.name}
            </li>)
            }
        </ul>
    </>
);

const UploadFile = (props) => (
    <>
        <h1 className="create-framework__title">{props.label}{props.required&&<span className="color-red P-4">*</span>}</h1>
        <form className="add__logo-form">
            <div className="add__logo-logo">
                {props.imageUrl ? <img src={props.imageUrl} alt="GRI" /> : null}
            </div>
            <label for="add__logo" className="add__logo-label"><span>Upload
            </span>
            </label>
            <input type="file" onChange={props.onChangeFile} name="logo" className="add__logo-input" id="add__logo" accept=".jpg, .jpeg, .png" />
            <span>|</span>
            <label className="remove__logo-label"><span onClick={props.onChangeRemoveFile}>Remove</span>
            </label>
        </form></>)

const Button = (props) => (<button onClick={props.onClickHandler} className={props.className}>
    {props.label}
</button>);

const Dropdown = (props) => {
    
    return (<select className={props.className_1} disabled={props.isEditable ? 'disabled' : ''}  name={props.name || ''} value={props.value} onChange={props.onChangeHandler}>
        {(props.options || []).map((option) => (
            <option className={props.className_2} value={option.value} selected={(option.value === props.value) ? 'selected': null}>{option.label}</option>
        ))}
    </select>);
}

const RadioButton = (props) => {
    const { changed = () => {}, id = null, isSelected = false, label = "RadioButton", value = "RadioButton" } = props;
    return (
      <div className="RadioButton">
        <input
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label htmlFor={id} className="radio-label">{label}</label>
      </div>
    );
  };

export default {
    Input,
    TextArea,
    Pills,
    UploadFile,
    Button,
    Dropdown,
    RadioButton
};