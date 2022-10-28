import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import './AnswerQuestionsTable.css';
import { listQuestions } from '../../../__mocks__/listQuestions.js';
import Fields from "../Common/Fields/Fields.jsx";
import ReAssignDisclosures from "../ReAssignDisclosures/ReAssignDisclosures.jsx";
const { RadioButton } = Fields
const AnswerQuestionsTable = (props) => {
    const [isOpenQAcard, setIsOpenQAcard] = useState(false);
    const [statusData, setStatusData] = useState({});
    const [questionsList, setQuestionsList] = useState([]);
    const [answer, setAnswer] = useState('');
    const [isOpenReAssign, setIsOpenReAssign] = useState(false);
    // const []
    const { itemDetails = {}, reportId= '', frameworkId = '', disclosureIndex, onClickSaveAnswer = () => { } } = props;

    useEffect(() => {
        // getQuestionList();
        setQuestionsList([...itemDetails.children]);
    }, []);

    const getQuestionList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            // const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${frameworkId}/disclosures/${itemDetails.id}`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            // const ListData = response.children;
            // ListData[0]['isSelected'] = true;
            // setQuestionsList([...ListData]);
            setQuestionsList([...listQuestions.children]); //Dummy
            // return response.results || [];
        } catch (e) {
            setStatusData({ type: '', message: '' });
        }
    }

    const onClickQuestions = (index) => {
        let cloneQuestionList = [...questionsList];
        cloneQuestionList = (cloneQuestionList || []).map((question, i) => {
            if (i === index) {
                question['isSelected'] = true;

            } else {
                question['isSelected'] = false;
            }
            return question;
        });
        setQuestionsList([...cloneQuestionList]);

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
            return (<select onChange={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)} value={_get(questionItem, 'value', 'Select')} className="framework__input" name="question-dropdown" id="answers-dropdown">
                {(questionItem.field_choices || []).map(choice => <option value={choice} selected={(choice === questionItem.value) ? 'selected' : null}>{choice}</option>)}
            </select>);
        } else if (_toLower(questionItem.field_type) === 'radio') {
            return <ul className="assign__categories">
                {(questionItem.field_choices || []).map((radioVal, i) => (<RadioButton
                    changed={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)}
                    id={i}
                    isSelected={_toLower(questionItem.value) === _toLower(radioVal)}
                    label={radioVal}
                    value={radioVal}
                />))}
            </ul>
        } else if (_toLower(questionItem.field_type) === 'multiselect') {
            return <ul className="assign__categories">
                {(questionItem.field_choices || []).map((choice, i) => <li onClick={() => onClickMultiSelect(choice, disclosureIndex, questionIndex)} className={`assign__categories-item ${(choice === questionItem.value) ? 'active' : ''}`}>{choice}</li>)}
            </ul>
        }
        else return <input type="text" className="assign__categories" value={questionItem.value} onChange={(e) => onChangeAnswerHandler(e, disclosureIndex, questionIndex)} />
    }

    const renderAnswerComponent = () => <>{
        (questionsList || []).map((questionItem, questionIndex) => {

            if (questionItem['isSelected']) {
                return (<>
                    <h5 className="detalis__information-title">
                        Size of Office space
                    </h5>
                    <p className="detalis__information-title">
                        Guidance Notes
                    </p>
                    <input type="text" className="assign__categories" value={itemDetails.metaData[0].value || ''} disabled />
                    <p className="detalis__information-title">
                        Answer
                    </p>
                    {getAnswerInputField(questionItem, questionIndex)}
                    <p className="detalis__information-title">
                        Unit
                    </p>
                    <input type="text" className="assign__categories" value={String(questionItem.field_unit_values || '')} disabled />
                    {/* <div>
                        <div className="question-save-btn-container"><button onClick={() => onClickSaveAnswer(answer, disclosureIndex, questionIndex)} className="question-save-btn">Save</button></div>
                    </div> */}
                </>)
            }
        })

    }</>


    return <li className="detalis__item">
       {isOpenReAssign&&<ReAssignDisclosures setIsOpenReAssign={setIsOpenReAssign} disclosure={itemDetails} reportId={reportId} />}
        <div className="detalis__top-item" onClick={() => setIsOpenQAcard(!isOpenQAcard)}>
            <div className="details__item-wrapper">
                <h3 className="detalis__title">
                    {itemDetails.code} {itemDetails.name}
                </h3>
                <img src="../../../../assets/icons/question-icon.svg" alt="question" width={'16px'} height="16px" />
                <a onClick={(e) => {setIsOpenReAssign(!isOpenReAssign); e.preventDefault(); e.stopPropagation();} } className="detalis__reassign">
                    Reassign
                    <img src="../../../../assets/icons/assign-icon.svg" alt="question" width={'16px'} height="16px" />
                </a>
            </div>
            <div className="details__item-wrapper">
                <p className="assign__categories-item active">
                    {itemDetails.category}
                </p>
                <img src="../../../../assets/icons/downarrow.svg" alt="question" width={'16px'} height="16px" />
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
                <>
                    {/* <div className="details__categories-information name-of-the-legal-entity">
                <h5 className="detalis__information-title">
                    Name of the Legal Entity - Enter the legal name of the organisation as registered.
                </h5>
                <p className="detalis__information-title">
                    Guidance Notes
                </p>
                <textarea className="assign__categories">If the organisation uses a commonly know trading name or business name that is different from its legal name, it should report this in addittion to its legal name.</textarea>
                <p className="detalis__information-title">
                    Answer
                </p>
                <input type="text" className="assign__categories" value="Axiata group Berhad, Kuala Lumpur Malaysia" />
                <form action="#" className="add__logo-form file-form detalis__form">
                    <p className="detalis__information-title">
                        File upload
                    </p>
                    <div className="add__file-window">

                    </div>
                    <label for="add__file" className="add__logo-label main__button browse__btn">
                        BROWSE
                        <input type="file" name="logo" className="add__logo-input" id="add__file" />
                    </label>
                </form>
            </div> */}
                </>
                <div className="details__categories-information size-of-office-space">
                    {renderAnswerComponent()}
                </div>

            </div>
        }
    </li>
}

export default AnswerQuestionsTable;