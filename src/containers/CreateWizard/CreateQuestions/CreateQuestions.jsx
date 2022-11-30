import React, { useState } from 'react';
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useLocation, useNavigate } from 'react-router-dom';
import { questions } from '../../../utils/constants.js';
import Popup from '../../../components/Common/Popup/Popup.jsx';
import './CreateQuestions.css';
import { useEffect } from 'react';
import { getErrorMessage } from '../../../utils/utils.js';
import AddQuestions from '../../../Components/AddQuestions/AddQuestions.jsx';
import ViewQuestionsList from '../../../Components/AddQuestions/ViewQuestionsList.jsx';
import { Title } from 'chart.js';

const CreateQuestions = (props) => {
    const { title = '', isTemplate=false, createQuestions = true, questionList = [], onUpdateQuestions = () => { } } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const state = _get(location, 'state', {});
    const { id = '', name = '', code = "", framework = '', description='', guidance="" } = state || {};
    const [statusData, setStatusData] = useState({});
    const [inputList, setInputList] = useState([]);
    const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
    const [isError, setIsError] = useState(false);
    const [editInfo, setEditInfo] = useState({ isEditable: false, editRowIndex: null });

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
            ...location.state,
            parent: null,
            children: newInputList
        }
        // setStatusData({ type: 'loading', message: '' });
        if (createQuestions&&(newInputList|| []).length > 0) {

            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework}/disclosures/${id}`, payload).then(({ data }) => data);
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
            navigate('/manageframework');
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

    let tableHeaders = ['Code', 'Question', 'Data Type', 'Input Type', 'Choices', 'Unit', null];
    return (<>
        {isOpenAddQuestion && <AddQuestions isTemplate={false} isShow={isOpenAddQuestion} editInfo={editInfo} inputList={inputList} setInputList={setInputList} closeModal={closeAddQuestionModal} />}
        <div className="main__top-wrapper">
            <h1 className="main__title">
                {title ? title : 'Welcome to Create Questions'}
            </h1>
        </div>
        <div id="createQuestions" className={`create_question__wrapper ${!createQuestions ? 'view-questions-list-container' : null}`}>
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}

            <ViewQuestionsList isTemplate={isTemplate} guidance={guidance} code={code} name={name} createQuestions={createQuestions} tableHeaders={tableHeaders} inputList={inputList} isError={isError}
                 onClickAddQuestion={onClickAddQuestion} handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} />
        </div>
        <div className='create-question-main-btn'>
            <button onClick={() => onCreateCancelQuestions()} className="main__button m-l-1 cancel-btn">
                Cancel
            </button>
            <button onClick={() => onCreateQuestions()} className="main__button m-l-1">
                FINISH
            </button>
        </div>

    </>)

}


export default CreateQuestions;