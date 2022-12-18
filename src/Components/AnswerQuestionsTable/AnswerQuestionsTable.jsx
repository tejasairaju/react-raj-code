import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import './AnswerQuestionsTable.css';
import { listQuestions } from '../../../__mocks__/listQuestions.js';
import Fields from "../Common/Fields/Fields.jsx";
import ReAssignDisclosures from "../ReAssignDisclosures/ReAssignDisclosures.jsx";
import Modal from "../Common/Modal/Modal.jsx";
import UploadEvidence from './UploadEvidence.jsx';

const { RadioButton, UploadFile, TextArea } = Fields;

const AnswerQuestionsTable = (props) => {
    const [isOpenQAcard, setIsOpenQAcard] = useState(false);
    const [logo, setLogo] = useState(null);
    const [statusData, setStatusData] = useState({});
    const [questionsList, setQuestionsList] = useState([]);
    const [answer, setAnswer] = useState('');
    const [isOpenReAssign, setIsOpenReAssign] = useState(false);
    const [isShowDescription, setIsShowDescription] = useState(false);
    const { itemDetails = {}, reportId = '', frameworkId = '', disclosureIndex, onClickSaveAnswer = () => { } } = props;

    useEffect(() => {
        setQuestionsList([...itemDetails.children]);
    }, []);

    const getQuestionList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            setStatusData({ type: '', message: '' });
            setQuestionsList([...listQuestions.children]); //Dummy
        } catch (e) {
            setStatusData({ type: '', message: '' });
        }
    }

    const onClickQuestions = (index) => {
        let cloneQuestionList = [...questionsList];
        cloneQuestionList = (cloneQuestionList || []).map((question, i) => {
            if (i === index) {
                question['isSelected'] = !question['isSelected'];

            } else {
                question['isSelected'] = false;
            }
            return question;
        });
        setQuestionsList([...cloneQuestionList]);
        //setLogo(null);
    }

    const onChangeRemoveFile = () => {
        setLogo(null);
    }

    const onChangeAnswerHandler = (e, disclosureIndex, questionIndex) => {
        const { value } = e.target;
        onClickSaveAnswer(value, disclosureIndex, questionIndex)
        // setAnswer(value);
    }

    const onClickMultiSelect = (value, disclosureIndex, questionIndex) => {
        onClickSaveAnswer(value, disclosureIndex, questionIndex)
    }

    const getAnswerInputField = (questionItem, questionIndex) => {
        if (_toLower(questionItem.field_type) === 'dropdown') {
            return (<select defaultValue={(typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value)} onChange={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)} value={(typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value)} className="framework__input" name="question-dropdown" id="answers-dropdown">
                {(questionItem.field_choices || []).map(
                    choice => <option value={choice}
                        defaultValue={(typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value)}
                        selected={(choice === (typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value
                        )) ? 'selected' : null}>{choice}</option>)}
            </select>);
        } else if (_toLower(questionItem.field_type) === 'radio button') {
            return <ul className="assign__categories">
                {(questionItem.field_choices || []).map((radioVal, i) => (<RadioButton
                    changed={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)}
                    id={i}
                    isSelected={_toLower(typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value) === _toLower(radioVal)}
                    label={radioVal}
                    value={radioVal}
                />))}
            </ul>
        } else if (_toLower(questionItem.field_type) === 'multiselect') {
            return <ul className="assign__categories">
                {(questionItem.field_choices || []).map((choice, i) => <li onClick={() => onClickMultiSelect(choice, disclosureIndex, questionIndex)} className={`assign__categories-item ${(choice === (typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value)) ? 'active' : ''}`}>{choice}</li>)}
            </ul>
        }
        else return <input type="text" className="assign__categories" value={typeof questionItem.value == "object" ? questionItem.value.value : questionItem.value} onChange={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)} />
    }

    const onChangeFile = (event, disclosureIndex, questionIndex) => {
        const imageUrl = event.target.files[0];
        const fileName = event.target.files[0].name;
        onClickSaveAnswer(URL.createObjectURL(imageUrl), disclosureIndex, questionIndex, "image_url")
        setLogo(URL.createObjectURL(imageUrl));
        if (imageUrl) {
            // setUploadImage({ fileName, imageUrl });
        }
    }

    const closePopupModal = () => {
        setIsShowDescription(false);
    }

    const renderAnswerComponent = () => <>{
        (questionsList || []).map((questionItem, questionIndex) => {

            if (questionItem['isSelected']) {
                return (<>
                    <h5 className="detalis__information-title">
                        <b>{questionItem.label} ?</b>
                    </h5>
                    {!_isEmpty(_get(questionItem, 'description', '')) && <><p className="detalis__information-title">
                        Guidance Notes
                    </p>
                        <TextArea rows={5} type="text" className="assign__categories" value={_get(questionItem, 'description', '')} disabled />
                    </>
                    }
                    <p className="detalis__information-title">
                        Answer :
                    </p>
                    {getAnswerInputField(questionItem, questionIndex)}
                    {!_isEmpty(questionItem.field_unit_values) && <>
                        <p className="detalis__information-title">
                            Unit
                        </p>
                        <input type="text" className="assign__categories" value={String(questionItem.field_unit_values || '')} disabled />
                    </>
                    }
                    <br />
                    <>{<UploadEvidence setStatusData={setStatusData} disclosureIndex={disclosureIndex} questionIndex={questionIndex} getDisclosures={() => { props.getDisclosures(); onClickQuestions(questionIndex) }} question={questionItem} reportId={reportId} disclosureId={itemDetails.id} kpiId={questionItem.id} imageUrl={questionItem.imageUrl} />}</>
                </>)
            }
        })

    }</>


    return <li className="detalis__item">
        {isShowDescription && <Modal isShow={!!isShowDescription} isDisclosureDec={true} closeModal={closePopupModal}>
            <div className='create-options-title'>Guidance:</div>
            <div className='get-textarea-input-container'>
                <div className="create-framework__textarea disclosure-description-screen">{(_isEmpty(_get(itemDetails, 'metaData[0].value', ''))) ? itemDetails.description : <p dangerouslySetInnerHTML={{ __html: _get(itemDetails, 'metaData[0].value', '') }}></p>}</div>
            </div>
        </Modal>}
        {isOpenReAssign && <ReAssignDisclosures setIsOpenReAssign={setIsOpenReAssign} disclosure={itemDetails} reportId={reportId} />}
        <div className="detalis__top-item" onClick={() => setIsOpenQAcard(!isOpenQAcard)}>
            <div className="details__item-wrapper">
                <h3 className="detalis__title disclosure-detalis__title">
                    {itemDetails.code} {itemDetails.name}
                </h3>
                {<img onClick={() => setIsShowDescription(true)} src="../../../../assets/icons/question-icon.svg" alt="question" width={'16px'} height="16px" />}
                &nbsp;&nbsp; <img src="../../../../assets/icons/downarrow.svg" alt="question" width={'16px'} height="16px" />
                <a onClick={(e) => { setIsOpenReAssign(!isOpenReAssign); e.preventDefault(); e.stopPropagation(); }} className="detalis__reassign">
                    Reassign
                    <img src="../../../../assets/icons/assign-icon.svg" alt="question" width={'16px'} height="16px" />
                </a>
            </div>
            <div className="details__item-wrapper">
                <p className="assign__categories-item active">
                    {itemDetails.category}
                </p>
            </div>
        </div>
        {isOpenQAcard &&
            <div className="detalis__information">
                <ul className="assign__categories details__categories">
                    {(questionsList || []).map((question, i) => <li onClick={() => onClickQuestions(i)} className={`assign__categories-item text-overflow-control ${question['isSelected'] ? 'active' : null}`}>
                        {question.label}
                    </li>)}

                </ul>
                <div className="details__line"></div>
                <div className="details__categories-information size-of-office-space">
                    {renderAnswerComponent()}
                </div>

            </div>
        }
    </li>
}

export default AnswerQuestionsTable;