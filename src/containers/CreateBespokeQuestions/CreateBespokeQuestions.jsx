import React, { useState } from 'react';
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { questions } from '../../utils/constants.js';
import Popup from '../../components/Common/Popup/Popup.jsx';
import Modal from '../../Components/Common/Modal/Modal.jsx';
import './CreateBespokeQuestions.css';
import { getErrorMessage } from '../../utils/utils.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Requests from '../../Requests/index.js';
import AddQuestions from '../../Components/AddQuestions/AddQuestions.jsx';
import ViewQuestionsList from '../../Components/AddQuestions/ViewQuestionsList.jsx';

const { Button, Input, TextArea, Dropdown } = Fields;

const CreateBespokeQuestions = (props) => {
    const {isTemplate=true, createQuestions = true, questionList = [], onUpdateQuestions = () => { } } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const { id = '', disclosureId = '' } = useParams();
    const state = _get(location, 'state', {});
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);
    const initialRow = { order: null, /*code: '',*/ label: "", type: '', field_type: '', field_unit_values: '', evidence: null, value: null };
    const initialFieldOptions = { selectedDropDownVal: null, setFieldIndex: null }
    const [inputList, setInputList] = useState([]);
    const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
    const [editInfo, setEditInfo] = useState({ isEditable: false, editRowIndex: null });
    const [isError, setIsError] = useState(false);
    const [fieldOptions, setFieldOptions] = useState(initialFieldOptions);

    const tableHeaders = ['Question Title', 'Data Type', 'Input Type', 'Choices', 'Unit', null];
    useEffect(() => {
        setInputList([...questionList]);
    }, []);

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const onCreateCancelQuestions = () => {
        setInputList([]);
    }

    const onCreateQuestions = async () => {
        let list = [...inputList];
        const newInputList = list.map(({ Dropdown, Multiselect, ...rest }) => {
            delete rest["Radio button"];
            return rest;
        });
        const payload = {
            children: newInputList,
            category: state.category,
            section: state.section,
            name: state.name
        }
        // setStatusData({ type: 'loading', message: '' });
        if (createQuestions) {

            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await Requests.Put(`/templates/${id}/disclosures/${disclosureId}`, payload, { organization: orgDetails.name});
                setStatusData({ type: 'success', message: 'Thanks! Your questions has been successfully created' });
                // setInputList([initialRow]);
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
            setIsError(false);
        } else if (!createQuestions && (list || [].length)) {
            onUpdateQuestions(payload, [...list]);
        } else {
            setIsError(true)
        }
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success' && createQuestions) {
            navigate('/template');
        }
        setStatusData({});

    }

    const onClickAddQuestion = () => {
        setIsOpenAddQuestion(true);
    }

    const closeAddQuestionModal = () => {
        setIsOpenAddQuestion(false);
    }

    const handleEditClick = (index) => {
        setIsOpenAddQuestion(true);
        setEditInfo({
            isEditable: true,
            editRowIndex: index
        });
    }

    return (<>
    {isOpenAddQuestion && <AddQuestions isTemplate={true} isShow={isOpenAddQuestion} editInfo={editInfo} inputList={inputList} setInputList={setInputList} closeModal={closeAddQuestionModal} />}
        <div className="main__top-wrapper">
            <h1 className="main__title">
                {`Welcome to Create Bespoke Questions`}
            </h1>
        </div>
        <div id="createQuestions" className="create_question__wrapper">
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            {/* {fieldOptions.selectedDropDownVal && <Modal isShow={!!fieldOptions.selectedDropDownVal} closeModal={closePopupModal}>
                <div className='create-options-title'>Please enter the options with comma separated value</div>
                <div className='get-textarea-input-container'>
                    <TextArea rows="6" cols="50" label='' name='optionString' value={inputList[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal] || ''} className="create-framework__textarea" placeholder="" required={true} onChangeHandler={onGetQuestionOptions} />
                    <div className='add-question-option'><Button label="Submit" className='add-btn submit-btn' onClickHandler={() => onSetFieldOptions()} /></div>
                </div>
            </Modal>} */}
            <ViewQuestionsList isTemplate={true} name={state.name} createQuestions={createQuestions} tableHeaders={tableHeaders} inputList={inputList} isError={isError}
                onClickAddQuestion={onClickAddQuestion} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />

            {/* <div>
                <div className="bespoke-question-container">
                    <h1 className="create-framework__title disclosure">
                        Disclosure
                        <img src='../../../../assets/images/questions.svg' alt='?' width='15px' height='15px' />
                    </h1>
                    <input type="text" className="create-framework__input bespoke-question-disclosure"
                        value={_get(state, 'name', '')} required disabled></input>
                </div>
            </div>
            <div className="create_questions_table__container">
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
                                        {inputList.length !== 1 && <Button label="Remove" className='remove-btn' onClickHandler={() => handleRemoveClick(i)} />}
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
            </div> */}

        </div>
        <div className='create-question-main-btn'>
            <button onClick={() => navigate(-1)} className="main__button m-l-1 cancel-btn">
                Back
            </button>
            <button onClick={() => onCreateQuestions()} className="main__button m-l-1">
                FINISH
            </button>
        </div>
    </>)

}


export default CreateBespokeQuestions;