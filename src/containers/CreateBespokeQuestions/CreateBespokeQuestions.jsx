import React, { useState } from 'react';
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useLocation, useParams } from 'react-router-dom';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { questions } from '../../utils/constants.js';
import Popup from '../../components/Common/Popup/Popup.jsx';
import Modal from '../../Components/Common/Modal/Modal.jsx';
import './CreateBespokeQuestions.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const { Button, Input, TextArea, Dropdown } = Fields;

const CreateBespokeQuestions = (props) => {
    const location = useLocation();
    const { id= '', disclosureId = '' } = useParams();
    const disclosures = _get(location, 'disclosures', { name: "", code: ''});
    const { dataType, inputType, unitType } = questions;
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);
    const initialRow = { order: null, code: '', label: "", type: '', field_type: '', field_unit_values: '', evidence: null, value: null };
    const initialFieldOptions = { selectedDropDownVal: null, setFieldIndex: null }
    const [inputList, setInputList] = useState([initialRow]);
    const [isError, setIsError] = useState(false);
    const [fieldOptions, setFieldOptions] = useState(initialFieldOptions);

    // useEffect(() => {
    //     setInputList({})
    // }, [])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        if (name !== 'field_unit_values') {
            list[index][name] = value;
        } else {
            list[index][name] = [value];
        }
        list[index]['order'] = index;
        setInputList(list);
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf(value) > -1) {
            setFieldOptions({ selectedDropDownVal: value, setFieldIndex: index });
        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = (index) => {
        if (!_isEmpty(inputList[index].code) && !_isEmpty(inputList[index].label) && !_isEmpty(inputList[index].type) && !_isEmpty(inputList[index].field_type) && !_isEmpty(inputList[index].field_unit_values)) {
            setInputList([...inputList, initialRow]);
            setIsError(false);
        } else {
            setIsError(true);
        }
        // setInputList([...inputList, initialRow]);
    };

    const onCreateCancelQuestions = () => {
        setInputList([initialRow]);
    }

    const onCreateQuestions = async () => {
        let list = [...inputList];
        const newInputList = list.map(({ Dropdown, Multiselect, ...rest }) => {
            delete rest["Radio button"];
            return rest;
        });
        const payload = {
            children: newInputList
        }

        let lastInputList = newInputList[newInputList.length - 1];
        if (!_isEmpty(lastInputList.code) && !_isEmpty(lastInputList.label) && !_isEmpty(lastInputList.type) && !_isEmpty(lastInputList.field_type) && !_isEmpty(lastInputList.field_unit_values)) {

            try {
                const response = await axios.put(`${process.env.API_BASE_URL}/templates/${id}/disclosures/${disclosureId}?organization=${orgDetails.name}`, payload).then(({ data }) => data);
                setStatusData({ type: 'success', message: 'Thanks! Your questions has been successfully created' });
                setInputList([initialRow]);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
            setIsError(false);
        } else {
            setIsError(true)
        }
    }

    const onGetQuestionOptions = (e) => {
        const { value } = e.target;
        const list = [...inputList];
        list[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal] = value;
        setInputList(list);
    }

    const onSetFieldOptions = () => {
        let list = [...inputList];
        let optionStringValue = list[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal];
        if (!_isEmpty(optionStringValue)) {
            list[fieldOptions.setFieldIndex]['field_choices'] = optionStringValue.split(',');
            setInputList(list);
            setFieldOptions(initialFieldOptions);
        }
    }

    const listChoices = (i) => {
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf((inputList[i].field_type || '')) > -1) {
            return <>{(inputList[i]['field_choices'] || []).map((choice) => <li>{choice}</li>)}</>;
        }
        return null;

    }

    const onCloseHandler = () => {
    }
    const closePopupModal = () => {
        setFieldOptions(initialFieldOptions);
    }

    const tableHeaders = ['Code', 'Question Title', 'Data Type', 'Input Type', 'Choices', 'Unit', null];
    return (<>
        <div className="main__top-wrapper">
            <h1 className="main__title">
                {`Welcome to Create Bespoke Questions`}
            </h1>
        </div>
        <div id="createQuestions" className="create_question__wrapper">
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            {fieldOptions.selectedDropDownVal && <Modal isShow={!!fieldOptions.selectedDropDownVal} closeModal={closePopupModal}>
                <div className='create-options-title'>Please enter the options with comma separated value</div>
                <div className='get-textarea-input-container'>
                    <TextArea rows="6" cols="50" label='' name='optionString' value={inputList[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal] || ''} className="create-framework__textarea" placeholder="" required={true} onChangeHandler={onGetQuestionOptions} />
                    <div className='add-question-option'><Button label="Submit" className='add-btn submit-btn' onClickHandler={() => onSetFieldOptions()} /></div>
                </div>
            </Modal>}
            <div>
                <div className="create-framework__row-wrapper">
                    <h1 className="create-framework__title">
                        Ref No
                    </h1>
                    <input type="text" min="0" step=".1" className="refno_create_question" value={disclosures.code || ''}
                        required disabled></input>
                    <h1 className="create-framework__title disclosure">
                        Disclosure
                        <img src='assets/images/questions.svg' alt='?' width='15px' height='15px' />
                    </h1>
                    <input type="text" className="create-framework__input"
                        value={disclosures.name} required disabled></input>
                </div>
            </div>
            <div className="create_questions_table__container">
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                <table className="default-table">
                    <thead><tr>{tableHeaders.map((header) => <th>{header}</th>)}</tr></thead>
                    <tbody>
                        {(inputList || []).map((x, i) => {
                            return (<tr>
                                <td>
                                    <Input label='' type="text" name='code' value={x.code} className="create-framework__input question-ref-code" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
                                </td>
                                <td>
                                    <TextArea label='' name='label' value={x.label} className="create-framework__input question-title create-framework__textarea" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
                                </td>
                                <td>
                                    <Dropdown className_1={'questions__select select1'} className_2={'questions__select-item'} options={dataType} name='type' value={x.type} onChangeHandler={(e) => handleInputChange(e, i)} />
                                </td>
                                <td>
                                    <Dropdown className_1={'questions__select select1'} className_2={'questions__select-item'} options={inputType} name='field_type' value={x.field_type} onChangeHandler={(e) => handleInputChange(e, i)} />
                                </td>
                                <td>
                                    <div className='preview-choices'>
                                        {listChoices(i)}
                                    </div>
                                </td>
                                <td>
                                    <Dropdown className_1={'questions__select select1'} className_2={'questions__select-item'} options={unitType} name='field_unit_values' value={x.field_unit_values} onChangeHandler={(e) => handleInputChange(e, i)} />

                                </td>
                                <td>
                                    <div className='flex'>
                                        {inputList.length !== 1 && <Button label="Remove" className='remove-btn' onClickHandler={(i) => handleRemoveClick(i)} />}
                                        {inputList.length - 1 === i && <Button label="Add" className='add-btn' onClickHandler={() => handleAddClick(i)} />}
                                    </div>
                                </td>
                            </tr>
                            )
                        })
                        }
                    </tbody>

                </table>
                {isError && <div className='overall-error-container color-red question-disclosure-error'>*Please fill all the columns</div>}
            </div>

        </div>
        <div className='create-question-main-btn'>
            {/* <button onClick={onCreateCancelQuestions} className="main__button m-l-1 cancel-btn">
                Cancel
            </button> */}
            <button onClick={onCreateQuestions} className="main__button m-l-1">
                FINISH
            </button>
        </div>
    </>)

}


export default CreateBespokeQuestions;