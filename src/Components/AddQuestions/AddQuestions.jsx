import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Fields from '../Common/Fields/Fields.jsx';
import { questions } from '../../utils/constants.js';
import Modal from '../Common/Modal/Modal.jsx';
import './AddQuestions.css';
import { useEffect } from 'react';

const { Input, Dropdown, TextArea, Button } = Fields;

const { dataType, inputType, unitType } = questions;

const AddQuestions = ({ isTemplate=false, isShow = false, editInfo = { isEditable: false}, setInputList, inputList, closeModal = () => { }, handleInputChange = () => { } }) => {
    const initialRow = { order: null, code: '', label: "", desc:"", type: '', field_type: '', field_unit_values: '', evidence: null, value: null, description: '' };
    const initialFieldOptions = { selectedDropDownVal: null, setFieldIndex: null }
    const [inputValue, setInputValue] = useState(initialRow);
    const [fieldOptions, setFieldOptions] = useState(initialFieldOptions);
    const [isOpen, setIsOpen] = useState(isShow);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if(editInfo.isEditable&&(inputList|| []). length) {
            setInputValue({ ...inputList[editInfo.editRowIndex]});
        }
    }, []);

    const onChangeHandler = (e) => {
        const { value = "", name = "" } = e.target;
        if (name == 'field_unit_values') {
            setInputValue({...inputValue, [name]: [value]});
        } else {
            setInputValue({...inputValue, [name]: value});
        }
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf(value) > -1) {
            setFieldOptions({ selectedDropDownVal: value, setFieldIndex: 0 });
        }
    }

    const onClickAddQuestion = () => {
        if (((!_isEmpty(inputValue.code)&&!isTemplate) ||(_isEmpty(inputValue.code)&&isTemplate)) && !_isEmpty(inputValue.label) && !_isEmpty(inputValue.type) && !_isEmpty(inputValue.field_type)) {
            if(!editInfo.isEditable) {
            setInputList([...inputList, {...inputValue, order: (inputList||[]).length +1 }]);
            } else {
                let cloneInputList = [...inputList];
                cloneInputList[editInfo.editRowIndex] = {...inputValue};
                setInputList(cloneInputList);
            }
            // setIsOpen(false);
            setIsError(false);
            closeModal();
        } else {
            setIsError(true);
        }
     
    }

    const onGetQuestionOptions = (e) => {
        const { value } = e.target;
        setInputValue({...inputValue, [fieldOptions.selectedDropDownVal]: value});
    }

    const onSetFieldOptions = () => {
        // let list = [...inputValue];
        let optionStringValue = inputValue[fieldOptions.selectedDropDownVal];
        if (!_isEmpty(optionStringValue)) {
            const optionList = optionStringValue.split(',');
            setInputValue({...inputValue, ['field_choices']: [...optionList] });
            setFieldOptions(initialFieldOptions);
        }
    }

    const closePopupModal = () => {
        setFieldOptions(initialFieldOptions);
    }

    const listChoices = (i) => {
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf((inputValue.field_type || '')) > -1) {
            return <>{(inputValue['field_choices'] || []).map((choice) => <li>{choice}</li>)}</>;
        }
        return null;

    }

    const closeAddQuesPopupModal = () => {
        setIsOpen(false);
        closeModal();
    }

    return (<>{isOpen&&
    <div className='add-ques-modal-popup-container'>
        {fieldOptions.selectedDropDownVal && <Modal isShow={!!fieldOptions.selectedDropDownVal} closeModal={closePopupModal}>
                <div className='create-options-title'>Please enter the options with comma separated value</div>
                <div className='get-textarea-input-container'>
                    <TextArea rows="6" cols="50" label='' name='optionString' value={inputValue[fieldOptions.selectedDropDownVal] || ''} className="create-framework__textarea create-option-textarea" placeholder="" required={true} onChangeHandler={onGetQuestionOptions} />
                    <div className='add-question-option'><Button label="Submit" className='add-btn submit-btn' onClickHandler={() => onSetFieldOptions()} /></div>
                </div>
            </Modal>}
        <div className='add-ques-modal-popup_inner'>
            <div className='add-ques-modal-popup-block'>
                <div className='add-ques-modal-popup-header'><span className='add-ques-close-modal-popup'><img onClick={() => closeAddQuesPopupModal()} src={`${isTemplate ? '../../../../': './../../'}assets/icons/close.svg`} width='24px' height='24px' /></span></div>
                <div className='add-ques-modal-popup-body'>
                    <div class="add-ques-main__content-wrapper">
                        {/* <h1 class="create-framework__title">
                    Ref No
                </h1>
                <div class="create-framework__row-wrapper ref__no">
                    <input type="number" min="0" step=".1" class="create-framework__input" value="2.6" required/>
                    <h1 class="create-framework__title disclosure">
                        Disclosure
                        <svg width="15" height="15"  onclick="showpopup()" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM18.4 18C18.4 18.2168 18.2168 18.4 18 18.4H2C1.7832 18.4 1.6 18.2168 1.6 18V2C1.6 1.7832 1.7832 1.6 2 1.6H18C18.2168 1.6 18.4 1.7832 18.4 2V18Z" fill="#2088BD"/>
                            <path d="M9.89335 13.7272C9.51895 13.7272 9.20135 13.856 8.94335 14.106C8.68535 14.3568 8.55615 14.6716 8.55615 15.0412C8.55615 15.4552 8.68975 15.7812 8.95615 16.0128C9.22295 16.2452 9.53575 16.3576 9.89295 16.3576C10.2402 16.3576 10.5454 16.2388 10.811 16.0052C11.0734 15.7724 11.2062 15.4472 11.2062 15.0412C11.2062 14.6716 11.0782 14.3568 10.825 14.106C10.5758 13.8564 10.263 13.7272 9.89335 13.7272Z" fill="#2088BD"/>
                            <path d="M12.3585 3.5088C11.7061 3.1924 10.9545 3.0368 10.1069 3.0368C9.1889 3.0368 8.3893 3.226 7.7049 3.5972C7.0177 3.9744 6.4945 4.4476 6.1373 5.022C5.7801 5.5912 5.6001 6.1576 5.6001 6.7148C5.6001 6.9828 5.7125 7.2328 5.9393 7.4704C6.1637 7.6964 6.4425 7.8148 6.7697 7.8148C7.3277 7.8148 7.7065 7.482 7.9073 6.8196C8.1181 6.19 8.3761 5.7088 8.6813 5.3836C8.9861 5.0568 9.4597 4.8936 10.1069 4.8936C10.6577 4.8936 11.1077 5.056 11.4569 5.3756C11.8053 5.7008 11.9809 6.0964 11.9809 6.5676C11.9809 6.8084 11.9221 7.0316 11.8093 7.2316C11.6937 7.4376 11.5521 7.6252 11.3873 7.7904C11.2197 7.9604 10.9461 8.2092 10.5717 8.5368C10.1429 8.9132 9.8029 9.234 9.5525 9.508C9.2997 9.7824 9.0973 10.0936 8.9437 10.4608C8.7925 10.8208 8.7157 11.2444 8.7157 11.7404C8.7157 12.1304 8.8193 12.4288 9.0289 12.6272C9.2365 12.8256 9.4937 12.9272 9.7981 12.9272C10.3837 12.9272 10.7317 12.62 10.8461 12.01C10.9105 11.7248 10.9581 11.5256 10.9893 11.4076C11.0229 11.2952 11.0661 11.1828 11.1261 11.0648C11.1857 10.9524 11.2761 10.824 11.3961 10.6868C11.5137 10.5488 11.6753 10.3924 11.8737 10.2056C12.5957 9.5616 13.0941 9.1044 13.3737 8.8304C13.6525 8.5616 13.8933 8.236 14.0949 7.8584C14.2977 7.482 14.4001 7.0436 14.4001 6.5448C14.4001 5.9152 14.2237 5.3248 13.8669 4.7896C13.5109 4.2484 13.0085 3.82 12.3585 3.5088Z" fill="#2088BD"/>
                        </svg>
                    </h1>
                    <input type="text" class="create-framework__input width" value="Activities, value chain and other business relationships" required/>
                </div> */}
                        <div class="create_questions__wrapper">
                            <h5 class={`create_questions__title ${isTemplate?'visibility-hidden': null}`}>
                                Code
                            </h5>
                            <h5 class="create_questions__title">
                                Question Title
                            </h5>
                            <h5 class="create_questions__title">
                                Description
                            </h5>
                            <h5 class="create_questions__title">
                                Data Type
                            </h5>
                            <h5 class="create_questions__title">
                                Input Type
                            </h5>
                            <h5 class="create_questions__title">
                                Choices
                            </h5>
                            <h5 class="create_questions__title">
                                Unit
                            </h5>

                            <input type="text"  name='code' value={inputValue.code} onChange={onChangeHandler} class={`add__file-window create_refs1 ${isTemplate?'visibility-hidden': null}`}/>
                            {/* <Input label='' type="text" name='code' value={inputValue.code} className="add__file-window create_refs1" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} /> */}

                            <textarea name="label" value={inputValue.label} onChange={onChangeHandler} class="add__file-window create_add__file-window create_quest1" > </textarea>
                            <textarea name="description" value={inputValue.description} onChange={onChangeHandler} class="add__file-window create_add__file-window create_quest2" > </textarea>
                            <Dropdown className_1={'questions__select create_select1'} className_2={'questions__select-item'} options={dataType} name='type' value={inputValue.type} onChangeHandler={onChangeHandler} />
                            <Dropdown className_1={'questions__select create_select2'} className_2={'questions__select-item'} options={inputType} name='field_type' value={inputValue.field_type} onChangeHandler={onChangeHandler} />
                            {/* <input type="text" class="questions__select create_select3" /> */}
                            <div className='questions__select create_select3 add-questions-choices'>
                                        {listChoices()}
                                    </div>
                            <Dropdown className_1={'questions__select create_select4'} className_2={'questions__select-item'} options={unitType} name='field_unit_values' value={inputValue.field_unit_values} onChangeHandler={onChangeHandler} />
                           
                            <div class="addbtn create_select5">
                                <button onClick={() => onClickAddQuestion()} class="createques__button">
                                    {editInfo.isEditable ? 'UPDATE': 'ADD'}
                                </button>
                            </div>

                            {/* <select name="data-type" id="" class="questions__select create_select1">
                                <option value="" class="questions__select-item">
                                    Varchar
                                </option>
                                <option value="" class="questions__select-item">
                                    Number
                                </option>
                                <option value="" class="questions__select-item">
                                    %
                                </option>
                                <option value="" class="questions__select-item">
                                    Currency
                                </option>
                                <option value="" class="questions__select-item">
                                    Datetime
                                </option>
                            </select> */}
                            {/* <select name="data-type" id="" class="questions__select create_select2">
                                <option value="" class="questions__select-item">
                                    Input
                                </option>
                                <option value="" class="questions__select-item">
                                    Dropdown
                                </option>
                                <option value="" class="questions__select-item">
                                    Radio button
                                </option>
                                <option value="" class="questions__select-item">
                                    Currency
                                </option>
                                <option value="" class="questions__select-item">
                                    Multiselect
                                </option>
                            </select> */}
                            {/* <input type="text" class="questions__select create_select3" /> */}

                            {/* <select name="data-type" id="" class="questions__select create_select4">
                                <option value="" class="questions__select-item">
                                    N/A
                                </option>
                                <option value="" class="questions__select-item">
                                    Numbers
                                </option>
                                <option value="" class="questions__select-item">
                                    sq Mt
                                </option>
                                <option value="" class="questions__select-item">
                                    kWh
                                </option>
                                <option value="" class="questions__select-item">
                                    liters
                                </option>
                            </select> */}
                            {/* <div class="addbtn create_select5">
                                <button class="createques__button">
                                    ADD
                                </button>
                            </div> */}

                        </div>
                        
                    </div>
                    { isError&& <div className='overall-error-container color-red question-disclosure-error'>*Please fill all the columns</div>}
                </div>
            </div>
        </div>
    </div>
}
    </>);
}

export default AddQuestions;