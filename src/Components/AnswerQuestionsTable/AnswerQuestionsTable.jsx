import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AnswerQuestionsTable.css';
import { listQuestions } from '../../../__mocks__/listQuestions.js';

const AnswerQuestionsTable = (props) => {
    const [isOpenQAcard, setIsOpenQAcard] = useState(false);
    const [statusData, setStatusData] = useState({});
    const [questionsList, setQuestionsList] = useState([]);
    const { itemDetails = {}, frameworkId = '' } = props;

    useEffect(() => {
        getQuestionList();

    }, []);

    const getQuestionList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            // const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${frameworkId}/disclosures/${itemDetails.id}`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            const ListData = response.children;
            ListData[0]['isSelected'] = true;
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
            if(i === index) {
                question['isSelected'] = true;
            } else {
                question['isSelected'] = false;
            }
            return question;
        });
        setQuestionsList([...cloneQuestionList]);

    }


    return <li className="detalis__item">
        <div className="detalis__top-item" onClick={() => setIsOpenQAcard(!isOpenQAcard)}>
            <div className="details__item-wrapper">
                <h3 className="detalis__title">
                    {itemDetails.code} {itemDetails.name}
                </h3>
                <img src="assets/icons/question-icon.svg" alt="question" width={'16px'} height="16px" />
                <a href="#" className="detalis__reassign">
                    Reassign
                    <img src="assets/icons/assign-icon.svg" alt="question" width={'16px'} height="16px" />
                </a>
            </div>
            <div className="details__item-wrapper">
                <p className="assign__categories-item active">
                    {itemDetails.category}
                </p>
                <img src="assets/icons/downarrow.svg" alt="question" width={'16px'} height="16px" />

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
                    <h5 className="detalis__information-title">
                        Size of Office space
                    </h5>
                    <p className="detalis__information-title">
                        Guidance Notes
                    </p>
                    <input type="text" className="assign__categories" value="Provide the size of corporate office in terms of square meters" />
                    <p className="detalis__information-title">
                        Answer
                    </p>
                    <input type="text" className="assign__categories" value="1500" />
                    <p className="detalis__information-title">
                        Unit
                    </p>
                    <input type="text" className="assign__categories" value="Square Meters" />
                </div>
            </div>
        }
    </li>
}

export default AnswerQuestionsTable;