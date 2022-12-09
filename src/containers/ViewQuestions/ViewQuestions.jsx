import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import './ViewQuestions.css';
import Requests from "../../Requests";
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import CreateQuestions from "../CreateWizard/CreateQuestions/CreateQuestions.jsx";
import { getErrorMessage } from "../../utils/utils";;

const ViewQuestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = _get(location, 'state', {});
    const {framework_id = '',
        disclosure_id = '' } = state || {};
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    const [inputList, setInputList] = useState([]);

    const getAllQuestions = async () => {
        try {
            const response = await Requests.Get(`/esgadmin/frameworks/${framework_id}/disclosures/${disclosure_id}`);
            setInputList([...response.children]);
        } catch (e) {
            setInputList([]);
        }
    }

    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setApiData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
        getAllQuestions();
        getframeworkDetails();
    }, []);

    const getframeworkDetails = async (id = "aa0fda2d-4f43-41b9-a35e-483016b225e1") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}`).then(({ data }) => data);
            setFrameworkData(frameDetails);
        } catch (e) {
            setFrameworkData({});
        }
    }

    const onCloseHandler = () => {
        setStatusData({ type: '', message: ''});
        if(statusData.type === 'success') {
            navigate(-1);
        }
    }

    const onUpdateQuestions = async (payload, editedQuestionList = []) => {
        setStatusData({ type: 'loading', message: '' });
        if ((editedQuestionList || [].length > 0)) {
            try {
                const response = await axios.patch(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}/disclosures/${disclosure_id}`, payload).then(({ data }) => data);
                setStatusData({ type: 'success', message: 'Thanks! Your questions has been successfully updated' });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
        }
    }

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title custom-title">
                    Edit Framework {'->'} List Frameworks {'->'} View Disclosures {'->'} List Disclosures {'->'}  List Questions
                </h1>
            </div>
            <table className="default-flex-table disc-framework-details">
                <tr>
                    <td>{frameworkData && <img src={frameworkData.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
                    <td>{frameworkData.name}</td>
                    <td>{frameworkData.description}</td>
                </tr>
            </table>
            <div id="viewQuestions" className="view-questions-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                {((inputList||[]).length > 0)&&<CreateQuestions createQuestions={false} questionList={inputList} onUpdateQuestions={onUpdateQuestions} />}
            </div>
        </>)
}

export default ViewQuestions;